// The createAgent flow enables administrators to create new AI agents with specific roles, knowledge, and skills, based on uploaded knowledge documents.
// It exports the CreateAgentInput and CreateAgentOutput types, and the createAgent function.
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
import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
const CreateAgentInputSchema = z.object({
    agentName: z.string().describe('The name of the agent to be created.'),
    agentRole: z.string().describe('The role of the agent (e.g., code reviewer, documentation writer).'),
    agentSkills: z.string().describe('A description of the agent\'s skills and expertise.'),
    knowledgeDocument: z.string().describe('Content of the knowledge document the agent will use.'),
});
const CreateAgentOutputSchema = z.object({
    agentId: z.string().describe('A unique identifier for the created agent.'),
    success: z.boolean().describe('Indicates whether the agent creation was successful.'),
    message: z.string().describe('A message indicating the status of the agent creation.'),
});
export function createAgent(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return createAgentFlow(input);
    });
}
const createAgentPrompt = ai.definePrompt({
    name: 'createAgentPrompt',
    input: {
        schema: z.object({
            agentName: z.string().describe('The name of the agent to be created.'),
            agentRole: z.string().describe('The role of the agent (e.g., code reviewer, documentation writer).'),
            agentSkills: z.string().describe('A description of the agent\'s skills and expertise.'),
            knowledgeDocument: z.string().describe('Content of the knowledge document the agent will use.'),
        }),
    },
    output: {
        schema: z.object({
            agentId: z.string().describe('A unique identifier for the created agent.'),
            success: z.boolean().describe('Indicates whether the agent creation was successful.'),
            message: z.string().describe('A message indicating the status of the agent creation.'),
        }),
    },
    prompt: `You are an agent creation assistant. Use the provided information to create a new agent.

Agent Name: {{{agentName}}}
Agent Role: {{{agentRole}}}
Agent Skills: {{{agentSkills}}}
Knowledge Document:
{{{knowledgeDocument}}}

Create a new agent based on the above information.  If the agent was successfully created, return success: true.  Make sure to return a UUID for agentId.  Return a message explaining what happened.`,
});
const createAgentFlow = ai.defineFlow({
    name: 'createAgentFlow',
    inputSchema: CreateAgentInputSchema,
    outputSchema: CreateAgentOutputSchema,
}, (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { output } = yield createAgentPrompt(input);
    return output;
}));
