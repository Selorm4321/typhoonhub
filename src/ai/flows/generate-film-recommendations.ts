'use server';

/**
 * @fileOverview Recommends similar movies based on viewing history, including hidden gems.
 *
 * - generateFilmRecommendations - A function that handles the film recommendation process.
 * - GenerateFilmRecommendationsInput - The input type for the generateFilmRecommendations function.
 * - GenerateFilmRecommendationsOutput - The return type for the generateFilmRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFilmRecommendationsInputSchema = z.object({
  viewingHistory: z
    .string()
    .describe('A list of movies the user has watched, separated by commas.'),
});
export type GenerateFilmRecommendationsInput = z.infer<
  typeof GenerateFilmRecommendationsInputSchema
>;

const GenerateFilmRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of recommended movies based on the viewing history, including hidden gems, separated by commas.'
    ),
});
export type GenerateFilmRecommendationsOutput = z.infer<
  typeof GenerateFilmRecommendationsOutputSchema
>;

export async function generateFilmRecommendations(
  input: GenerateFilmRecommendationsInput
): Promise<GenerateFilmRecommendationsOutput> {
  return generateFilmRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFilmRecommendationsPrompt',
  input: {schema: GenerateFilmRecommendationsInputSchema},
  output: {schema: GenerateFilmRecommendationsOutputSchema},
  prompt: `You are an expert movie recommender. Given a user's viewing history, you will recommend similar movies, including hidden gems that are not as well-known.

Viewing History: {{{viewingHistory}}}

Recommendations:`,
});

const generateFilmRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateFilmRecommendationsFlow',
    inputSchema: GenerateFilmRecommendationsInputSchema,
    outputSchema: GenerateFilmRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
