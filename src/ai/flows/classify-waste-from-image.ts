'use server';
/**
 * @fileOverview This file defines a Genkit flow for classifying waste from an image and suggesting disposal and reuse methods.
 *
 * - classifyWasteFromImage - A function that takes an image of waste as input and returns suggested disposal and reuse methods.
 * - ClassifyWasteFromImageInput - The input type for the classifyWasteFromImage function, expects a data URI of the image.
 * - ClassifyWasteFromImageOutput - The return type for the classifyWasteFromImage function, provides suggested disposal and reuse methods.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyWasteFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of waste, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ClassifyWasteFromImageInput = z.infer<
  typeof ClassifyWasteFromImageInputSchema
>;

const ClassifyWasteFromImageOutputSchema = z.object({
  disposalMethods: z
    .string()
    .describe('Suggested disposal methods for the waste in the image.'),
  reductionSuggestion: z
    .string()
    .describe('A suggestion on how to reduce or reuse the waste item.'),
});
export type ClassifyWasteFromImageOutput = z.infer<
  typeof ClassifyWasteFromImageOutputSchema
>;

export async function classifyWasteFromImage(
  input: ClassifyWasteFromImageInput
): Promise<ClassifyWasteFromImageOutput> {
  return classifyWasteFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyWasteFromImagePrompt',
  input: {schema: ClassifyWasteFromImageInputSchema},
  output: {schema: ClassifyWasteFromImageOutputSchema},
  prompt: `You are an AI waste classifier and sustainability expert. Given an image of a waste item, you will identify the materials and suggest appropriate disposal methods.

In addition, you will provide a creative and practical suggestion for how the item could be reused or upcycled, or how to reduce the use of such items in the future.

Here is the image of the waste:
{{media url=photoDataUri}}

Please provide a detailed suggestion of disposal methods and a separate suggestion for reduction/reuse.
  `,
});

const classifyWasteFromImageFlow = ai.defineFlow(
  {
    name: 'classifyWasteFromImageFlow',
    inputSchema: ClassifyWasteFromImageInputSchema,
    outputSchema: ClassifyWasteFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
