// src/ai/dev.ts
import "dotenv/config";

export const DEV_BANNER = "Genkit local dev"; // <= properly closed string

// If you’re using Genkit, keep a minimal valid file:
// import { startFlow } from "genkit"; // This seems to be causing a type error.

export async function hello() {
  return "ok"; // <= also a closed string
}

// Optional: allow `npm run genkit:dev` to start cleanly
/*
if (require.main === module) {
  startFlow(async () => {
    console.log("[genkit] dev started");
    await hello();
  });
}
*/
