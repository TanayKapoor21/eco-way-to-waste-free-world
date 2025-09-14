'use server';
/**
 * @fileOverview This file defines a Genkit flow for classifying waste from an image and suggesting disposal methods.
 *
 * - classifyWasteFromImage - A function that takes an image of waste as input and returns suggested disposal methods.
 * - ClassifyWasteFromImageInput - The input type for the classifyWasteFromImage function, expects a data URI of the image.
 * - ClassifyWasteFromImageOutput - The return type for the classifyWasteFromImage function, provides suggested disposal methods.
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
  prompt: `You are an AI waste classifier. Given an image of waste, you will identify the materials and suggest appropriate disposal methods.

  Here is the image of the waste:
  {{media url=photoDataUri}}

  Please provide a detailed suggestion of disposal methods.
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
