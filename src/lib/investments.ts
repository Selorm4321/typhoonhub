import {
  collection, getDocs, query, where, limit
} from "firebase/firestore";

export interface Investment {
  shortDescription?: string;
  goal: number;
  raised: number;
  heroImage?: string;
}
