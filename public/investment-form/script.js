import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form
const form = document.getElementById("investForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const amount = parseFloat(data.get("amount"));
  const amountCents = Math.round(amount * 100); // Convert to cents and round


  try {
    await addDoc(collection(db, "investors"), {
      name: data.get("name"),
      email: data.get("email"),
      amount: parseFloat(data.get("amount")),
      paymentMethod: data.get("paymentMethod"),
 notes: data.get("notes") || "", // Save notes to Firestore
      date: serverTimestamp(),
    });

    // After successfully recording investment, initiate Stripe checkout
    const checkoutResponse = await fetch('/api/invest/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 projectId: 'mary-and-rose', // Default project ID
 projectTitle: 'Mary and Rose', // Default project title
 amountCents: amountCents,
      }),
    });
    console.log('Checkout API response status:', checkoutResponse.status);

    const checkoutData = await checkoutResponse.json();
    console.log('Checkout API response data:', checkoutData);

    if (checkoutData.url) {
      window.location.href = checkoutData.url; // Redirect to Stripe checkout
    } else {
 status.innerText = "❌ Failed to initiate payment. " + (checkoutData.error || "Please try again.");
      console.error("Checkout session creation failed:", checkoutData.error);
    }
  } catch (error) {
    console.error("Error:", error);
    status.innerText = "❌ Something went wrong. Please try again.";
  }
});