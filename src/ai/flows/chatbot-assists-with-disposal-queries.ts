'use server';
/**
 * @fileOverview An AI chatbot that assists users with waste disposal queries.
 *
 * - chatbotAssistsWithDisposalQueries - A function that handles the chatbot assistance for waste disposal.
 * - ChatbotAssistsWithDisposalQueriesInput - The input type for the chatbotAssistsWithDisposalQueries function.
 * - ChatbotAssistsWithDisposalQueriesOutput - The return type for the chatbotAssistsWithDisposalQueries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistsWithDisposalQueriesInputSchema = z.object({
  itemDescription: z.string().describe('The description of the item for which disposal guidance is needed.'),
});
export type ChatbotAssistsWithDisposalQueriesInput = z.infer<typeof ChatbotAssistsWithDisposalQueriesInputSchema>;

const ChatbotAssistsWithDisposalQueriesOutputSchema = z.object({
  disposalGuidance: z.string().describe('The guidance on how to dispose of the item.'),
});
export type ChatbotAssistsWithDisposalQueriesOutput = z.infer<typeof ChatbotAssistsWithDisposalQueriesOutputSchema>;

export async function chatbotAssistsWithDisposalQueries(input: ChatbotAssistsWithDisposalQueriesInput): Promise<ChatbotAssistsWithDisposalQueriesOutput> {
  return chatbotAssistsWithDisposalQueriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAssistsWithDisposalQueriesPrompt',
  input: {schema: ChatbotAssistsWithDisposalQueriesInputSchema},
  output: {schema: ChatbotAssistsWithDisposalQueriesOutputSchema},
  prompt: `You are a helpful AI chatbot that assists users with waste disposal queries.

  Based on the item described by the user, provide accurate and helpful guidance on how to dispose of it.

  Item Description: {{{itemDescription}}}`,
});

const chatbotAssistsWithDisposalQueriesFlow = ai.defineFlow(
  {
    name: 'chatbotAssistsWithDisposalQueriesFlow',
    inputSchema: ChatbotAssistsWithDisposalQueriesInputSchema,
    outputSchema: ChatbotAssistsWithDisposalQueriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
