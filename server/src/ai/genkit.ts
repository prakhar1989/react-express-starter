import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

// Initialize Genkit with the Google AI plugin
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'),
});

// Define input schema for joke
const JokeInputSchema = z.object({
  topic: z.string().optional().describe('Topic for the joke'),
});

// Define output schema for joke
const JokeSchema = z.object({
  joke: z.string(),
  category: z.string(),
});

// Define a joke generator flow
export const jokeGeneratorFlow = ai.defineFlow(
  {
    name: 'jokeGeneratorFlow',
    inputSchema: JokeInputSchema,
    outputSchema: JokeSchema,
  },
  async (input) => {
    const prompt = `Generate a clean, family-friendly joke${input.topic ? ` about ${input.topic}` : ''}. The joke should be appropriate for all audiences.`;

    const { output } = await ai.generate({
      prompt,
      output: { schema: JokeSchema },
    });

    if (!output) throw new Error('Failed to generate joke');

    return output;
  },
);