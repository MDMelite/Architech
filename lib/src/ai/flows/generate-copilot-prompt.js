// Required for Next.js to know this file is a server file.
'use server';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @fileOverview Automatically generates well-formatted prompt documents for GitHub Copilot.
 *
 * - generateCopilotPrompt - A function to generate a prompt document for GitHub Copilot.
 * - GenerateCopilotPromptInput - The input type for the generateCopilotPrompt function.
 * - GenerateCopilotPromptOutput - The return type for the generateCopilotPrompt function.
 */
import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
const GenerateCopilotPromptInputSchema = z.object({
    sessionId: z.string().describe('The unique identifier for the session.'),
    task: z.string().describe('The current task or objective.'),
    context: z.string().optional().describe('Relevant context information.'),
    codeReferences: z.string().optional().describe('Code snippets or references.'),
    expectedOutputFormat: z.string().optional().describe('The desired format for the output.'),
});
const GenerateCopilotPromptOutputSchema = z.object({
    promptDocument: z.string().describe('The generated prompt document for GitHub Copilot.'),
});
export function generateCopilotPrompt(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return generateCopilotPromptFlow(input);
    });
}
const prompt = ai.definePrompt({
    name: 'generateCopilotPromptPrompt',
    input: {
        schema: z.object({
            sessionId: z.string().describe('The unique identifier for the session.'),
            task: z.string().describe('The current task or objective.'),
            context: z.string().optional().describe('Relevant context information.'),
            codeReferences: z.string().optional().describe('Code snippets or references.'),
            expectedOutputFormat: z.string().optional().describe('The desired format for the output.'),
        }),
    },
    output: {
        schema: z.object({
            promptDocument: z.string().describe('The generated prompt document for GitHub Copilot.'),
        }),
    },
    prompt: `# Prompt for GitHub Copilot\n\n## Session Information\n- Session ID: {{{sessionId}}}\n- Timestamp: {{now}}\n- Origin: AI Agent\n- Target: GitHub Copilot\n\n## Context\n{{{context}}}\n\n## Instruction\n{{{task}}}\n\n## Expected Output\n{{{expectedOutputFormat}}}\n\n## References\n{{{codeReferences}}}`, // Handlebars syntax
});
const generateCopilotPromptFlow = ai.defineFlow({
    name: 'generateCopilotPromptFlow',
    inputSchema: GenerateCopilotPromptInputSchema,
    outputSchema: GenerateCopilotPromptOutputSchema,
}, (input) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date().toISOString();
    const { output } = yield prompt(Object.assign(Object.assign({}, input), { now }));
    return output;
}));
