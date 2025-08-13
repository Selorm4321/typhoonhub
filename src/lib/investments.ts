import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminDb } from './firebase-admin';
import type { Investment } from '@/lib/types/investment';

export async function fetchInvestmentBySlug(slug: string): Promise<Investment | null> {
  try {
    const q = query(
      collection(db, 'investments'),
      where('slug', '==', slug),
      where('status', '==', 'active'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No active investment found for slug: ${slug}`);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return { id: doc.id, ...data } as Investment;
  } catch (error) {
    console.error(`Error fetching investment by slug ${slug}:`, error);
    // This could be a permissions error or a missing index.
    // The calling component should handle the null return value.
    return null;
  }
}

export async function getInvestments(): Promise<Investment[]> {
  const snapshot = await adminDb
    .collection('investments')
    .where('status', '==', 'active')
    .get();

  if (snapshot.empty) {
    // This is not an error, just an empty state.
    return [];
  }

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investment));
}
