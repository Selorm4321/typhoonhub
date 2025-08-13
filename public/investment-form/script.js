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

  try {
    await addDoc(collection(db, "investors"), {
      name: data.get("name"),
      email: data.get("email"),
      amount: parseFloat(data.get("amount")),
      paymentMethod: data.get("paymentMethod"),
      notes: data.get("notes") || "",
      date: serverTimestamp(),
    });

    status.innerText = "✅ Thank you! Your investment has been recorded.";
    form.reset();
  } catch (error) {
    console.error("Error:", error);
    status.innerText = "❌ Something went wrong. Please try again.";
  }
});