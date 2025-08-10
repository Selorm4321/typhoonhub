import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Investment } from '@/lib/types/investment';

export async function fetchInvestmentBySlug(slug: string): Promise<Investment | null> {
  try {
    const q = query(collection(db, 'investments'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No investment found for slug: ${slug}`);
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Convert Firestore Timestamps to Dates, if they exist
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      data.createdAt = data.createdAt.toDate();
    }
    if (data.updatedAt && typeof data.updatedAt.toDate === 'function') {
      data.updatedAt = data.updatedAt.toDate();
    }

    return { id: doc.id, ...data } as Investment;
  } catch (error) {
    console.error(`Error fetching investment by slug ${slug}:`, error);
    return null;
  }
}
