import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pct = (raised: number, goal: number) => {
  if (goal === 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
};
