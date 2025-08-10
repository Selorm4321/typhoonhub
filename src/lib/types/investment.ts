// A minimal type for the featured investment card
export interface Investment {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  goal: number;
  raised: number;
  backers: number;
}
