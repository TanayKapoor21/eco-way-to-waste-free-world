'use server';
/**
 * @fileOverview This file defines a Genkit flow for classifying waste from a camera stream for an AR-like experience.
 *
 * - arWasteSorter - A function that takes an image data URI and returns the waste category.
 * - ARWasteSorterInput - The input type for the arWasteSorter function.
 * - ARWasteSorterOutput - The return type for the arWasteSorter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ARWasteSorterInputSchema = z.object({
  frameDataUri: z
    .string()
    .describe(
      "A single frame from a video stream, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ARWasteSorterInput = z.infer<typeof ARWasteSorterInputSchema>;

const ARWasteSorterOutputSchema = z.object({
  category: z.enum(['wet', 'dry', 'ewaste', 'recyclable', 'unknown']).describe('The category of waste detected in the frame.'),
  itemName: z.string().describe('The name of the item detected, e.g., "plastic bottle", "apple core".')
});
export type ARWasteSorterOutput = z.infer<typeof ARWasteSorterOutputSchema>;

export async function arWasteSorter(
  input: ARWasteSorterInput
): Promise<ARWasteSorterOutput> {
  return arWasteSorterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'arWasteSorterPrompt',
  input: {schema: ARWasteSorterInputSchema},
  output: {schema: ARWasteSorterOutputSchema},
  prompt: `You are an expert waste sorter. Your task is to analyze an image from a video feed and identify the primary waste item visible.
Classify the item into one of the following categories: 'wet', 'dry', 'ewaste', 'recyclable', or 'unknown'.
- 'wet': Organic waste like food scraps.
- 'dry': Non-organic, non-recyclable waste like certain plastics or packaging.
- 'ewaste': Electronic waste like batteries, cables, or old phones.
- 'recyclable': Items that can be recycled, like paper, glass, or certain plastics.
- 'unknown': If no clear waste item is visible or it's unidentifiable.

Identify the item and its category. Respond quickly and concisely.

Image to analyze:
{{media url=frameDataUri}}
  `,
});

const arWasteSorterFlow = ai.defineFlow(
  {
    name: 'arWasteSorterFlow',
    inputSchema: ARWasteSorterInputSchema,
    outputSchema: ARWasteSorterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
