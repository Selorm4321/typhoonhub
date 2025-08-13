import { db } from "@/lib/firebaseClient";
import {
 collection, getDocs, query, where, limit 
} from "firebase/firestore";
  shortDescription?: string;
  goal: number;
  raised: number;
  heroImage?: string;
  minimumInvestment?: number;

// Map Firestore doc data to our Investment shape
function toInvestment(d: any): Investment {
  return {
 slug: d.slug ?? "",
    title: d?.title ?? "",
    shortDescription: d?.shortDescription ?? d?.description ?? "",
 goal: Number(d.goal ?? d.fundingGoal ?? 0),
 raised: Number(d.raised ?? d.currentFunding ?? 0),
    heroImage: d?.heroImage ?? d?.imageUrl ?? "",
 minimumInvestment: Number(d.minimumInvestment ?? 0),
  };
}

export async function getInvestments(): Promise<Investment[]> {
  const col = collection(db, "productions");
  const q = query(
    collection(db, 'productions'),
    where('status', '==', 'active'),
 limit(12)
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => toInvestment(doc.data()));
}