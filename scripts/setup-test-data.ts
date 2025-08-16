#!/usr/bin/env ts-node

// Setup script to add test investment data to Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDv2MJ0VZFv4tKUnSxXZN99C4fs7ewE2tY",
  authDomain: "typhoon-indie-stream.firebaseapp.com",
  projectId: "typhoon-indie-stream",
  storageBucket: "typhoon-indie-stream.appspot.com",
  messagingSenderId: "752758817433",
  appId: "1:752758817433:web:367558c83c4e67fbb56e08"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function setupTestData() {
  try {
    // Create the featured investment project
    const investmentData = {
      slug: "mary-and-rose",
      title: "Mary and Rose",
      shortDescription: "A heartwarming drama about friendship, resilience, and finding hope in unexpected places.",
      heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
      goal: 50000,
      raised: 23750,
      backers: 47,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
      longDescription: "Mary and Rose follows two unlikely friends as they navigate life's challenges in a small coastal town. When a storm threatens to destroy everything they hold dear, they must learn to rely on each other and their community to rebuild and find hope again.",
      director: "Sarah Mitchell",
      producer: "David Chen",
      genre: ["Drama", "Independent"],
      expectedROI: "15-25%",
      productionTimeline: "8 months",
      riskLevel: "Medium",
      minimumInvestment: 100,
      featuredImageAlt: "Mary and Rose film poster showing two women by the ocean"
    };

    const docRef = doc(db, 'investments', 'mary-and-rose');
    await setDoc(docRef, investmentData);
    console.log('✅ Investment data added with ID: mary-and-rose');

    // Add some additional investment opportunities
    const additionalInvestments = [
      {
        slug: "midnight-jazz",
        title: "Midnight Jazz",
        shortDescription: "A noir thriller set in 1950s New Orleans jazz scene.",
        heroImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
        goal: 75000,
        raised: 12000,
        backers: 18,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        longDescription: "Set against the sultry backdrop of 1950s New Orleans, Midnight Jazz tells the story of a trumpet player caught between love and betrayal in the underground jazz scene.",
        director: "Marcus Williams",
        producer: "Lisa Rodriguez",
        genre: ["Thriller", "Period Drama"],
        expectedROI: "20-30%",
        productionTimeline: "12 months",
        riskLevel: "High",
        minimumInvestment: 250
      },
      {
        slug: "digital-dreams",
        title: "Digital Dreams",
        shortDescription: "A sci-fi exploration of virtual reality and human connection.",
        heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2070&auto=format&fit=crop",
        goal: 30000,
        raised: 28500,
        backers: 89,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        longDescription: "In a near-future world where virtual reality has become indistinguishable from reality, one programmer must choose between the perfect digital world and messy human relationships.",
        director: "Alex Kim",
        producer: "Jennifer Park",
        genre: ["Sci-Fi", "Drama"],
        expectedROI: "10-20%",
        productionTimeline: "6 months",
        riskLevel: "Low",
        minimumInvestment: 50
      }
    ];

    for (const investment of additionalInvestments) {
      const docRef = doc(db, 'investments', investment.slug);
      await setDoc(docRef, investment);
      console.log(`✅ Investment data added: ${investment.title}`);
    }

    console.log('🎉 All test data has been successfully added to Firebase!');
    console.log('📊 You can now view the investment page with real data.');
    
  } catch (error) {
    console.error('❌ Error adding test data:', error);
  }
}

setupTestData();