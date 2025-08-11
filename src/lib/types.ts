
export type Production = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  goal?: number;       // in cents
  raised?: number;     // in cents
  heroImage?: string;  // URL
  minInvestment?: number; // in cents
  active: boolean;
};
