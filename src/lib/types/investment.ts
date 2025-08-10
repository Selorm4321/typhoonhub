import { FieldValue } from 'firebase/firestore';

export interface Investment {
  id: string; // Document ID
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  status: 'active' | 'inactive' | 'completed';
  priority: number;
  goal: number;
  raised: number;
  backers: number;
  heroImage: string;
  images: string[];
  videoUrl?: string;
  highlights: string[];
  team: {
    director: string;
    producers: string[];
    cast: {
      name: string;
      role: string;
    }[];
  };
  docLinks?: {
    name: string;
    url: string;
  }[];
  createdAt: FieldValue | Date;
  updatedAt: FieldValue | Date;
}
