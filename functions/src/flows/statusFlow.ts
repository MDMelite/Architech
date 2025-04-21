import { z } from "zod";
import * as ai from "@genkit-ai/ai";
// Optional: import Firestore
// import { getFirestore } from "firebase-admin/firestore";

export const statusFlow = ai.defineFlow(
  {
    name: "statusFlow",
    outputSchema: z.object({
      endpoint: z.string(),
      status: z.string(),
      ts: z.string(),
      db: z.string().optional()
    })
  },
  async () => {
    // Optional Firestore health check
    // let dbStatus = undefined;
    // try {
    //   const db = getFirestore();
    //   await db.doc("health/ping").get();
    //   dbStatus = "ok";
    // } catch {
    //   dbStatus = "err";
    // }
    return {
      endpoint: "/status",
      status: "online",
      ts: new Date().toISOString(),
      // db: dbStatus
    };
  }
);