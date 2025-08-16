import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Investment } from '@/lib/types/investment';

// Local fallback data for development
const localInvestments: Investment[] = [
  {
    id: "mary-and-rose",
    slug: "mary-and-rose",
    title: "Mary and Rose",
    shortDescription: "A heartwarming drama about friendship, resilience, and finding hope in unexpected places.",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    goal: 50000,
    raised: 23750,
    backers: 47
  },
  {
    id: "midnight-jazz", 
    slug: "midnight-jazz",
    title: "Midnight Jazz",
    shortDescription: "A noir thriller set in 1950s New Orleans jazz scene.",
    heroImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    goal: 75000,
    raised: 12000,
    backers: 18
  },
  {
    id: "digital-dreams",
    slug: "digital-dreams", 
    title: "Digital Dreams",
    shortDescription: "A sci-fi exploration of virtual reality and human connection.",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2070&auto=format&fit=crop",
    goal: 30000,
    raised: 28500,
    backers: 89
  }
];

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
      console.warn(`No active investment found for slug: ${slug} in Firebase, using local data`);
      // Fallback to local data
      return localInvestments.find(inv => inv.slug === slug) || null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    return { id: doc.id, ...data } as Investment;
  } catch (error) {
    console.error(`Error fetching investment by slug ${slug}:`, error);
    console.log('Using local fallback data');
    // Fallback to local data when Firebase is unavailable
    return localInvestments.find(inv => inv.slug === slug) || null;
  }
}

export async function fetchAllInvestments(): Promise<Investment[]> {
  try {
    const q = query(
      collection(db, 'investments'),
      where('status', '==', 'active')
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn('No active investments found in Firebase, using local data');
      return localInvestments;
    }

    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Investment));
  } catch (error) {
    console.error('Error fetching investments:', error);
    console.log('Using local fallback data');
    return localInvestments;
  }
}
