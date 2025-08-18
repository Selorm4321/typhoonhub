import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });

export const createCheckoutSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { projectId, projectTitle, amountCents, success_url, cancel_url } = req.body || {};
  if (!projectId || !amountCents) return res.status(400).json({ error: 'projectId and amountCents are required' });

  const snap = await db.collection('productions').doc(projectId).get();
  if (!snap.exists) return res.status(404).json({ error: 'Project not found' });
  const data = snap.data() as any;
  const minCents = Number(data.minimumInvestment ?? 0);
  if (Number(amountCents) < minCents) return res.status(400).json({ error: `Minimum investment is ${minCents} cents` });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: Number(amountCents),
        product_data: { name: `Investment in ${projectTitle ?? projectId}` },
      },
      quantity: 1,
    }],
    success_url: success_url || `${req.headers.origin || 'https://typhoonhub.ca'}/invest?status=success`,
    cancel_url: cancel_url || `${req.headers.origin || 'https://typhoonhub.ca'}/invest?status=cancelled`,
    metadata: { projectId },
  });

  return res.status(200).json({ url: session.url });
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    const sig = req.headers['stripe-signature'] as string;
    if (!whSecret || !sig) return res.status(400).send('Missing webhook configuration');
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);
    const event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const projectId = session.metadata?.projectId;
      const amountCents = session.amount_total || 0;
      if (projectId && amountCents > 0) {
        const ref = db.collection('productions').doc(projectId);
        await db.runTransaction(async (tx) => {
          const doc = await tx.get(ref);
          if (!doc.exists) return;
          const prev = doc.data() as any;
          tx.update(ref, {
            currentFunding: Number(prev.currentFunding ?? 0) + Number(amountCents),
            investors: Number(prev.investors ?? 0) + 1,
          });
        });
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
