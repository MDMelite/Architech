import { z } from "zod";
import * as ai from "@genkit-ai/ai";

export const statusFlow = ai.defineFlow(
  {
    name: "statusFlow",
    outputSchema: z.object({
      endpoint: z.string(),
      status: z.string(),
      ts: z.string()
    })
  },
  async () => {
    return {
      endpoint: "/status",
      status: "ok",
      ts: new Date().toISOString()
    };
  }
);