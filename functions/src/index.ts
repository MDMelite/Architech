import { onRequest } from "firebase-functions/v2/https";
import { flow, flowHttp } from "@genkit-ai/flow";

// ---- health flows --------------------------------------------------
export const statusFlow = flow("statusFlow", async () => ({
  endpoint: "/status",
  status: "not-yet-implemented"
}));
export const whoamiFlow = flow("whoamiFlow", async () => ({
  endpoint: "/whoami",
  status: "not-yet-implemented"
}));

// ---- orchestration & files flows -----------------------------------
export const logFlow = flow("logFlow", async () => ({
  endpoint: "/log",
  status: "not-yet-implemented"
}));
export const writeFileFlow = flow("writeFileFlow", async () => ({
  endpoint: "/write-file",
  status: "not-yet-implemented"
}));
export const planFlow = flow("planFlow", async () => ({
  endpoint: "/plan",
  status: "not-yet-implemented"
}));
export const createPrFlow = flow("createPrFlow", async () => ({
  endpoint: "/create-pr",
  status: "not-yet-implemented"
}));
export const filesFlow = flow("filesFlow", async () => ({
  endpoint: "/files",
  status: "not-yet-implemented"
}));
export const commandFlow = flow("commandFlow", async () => ({
  endpoint: "/command",
  status: "not-yet-implemented"
}));

// ---- HTTP handlers -------------------------------------------------
export const status    = onRequest(flowHttp(statusFlow));
export const whoami    = onRequest(flowHttp(whoamiFlow));
export const log       = onRequest(flowHttp(logFlow));
export const writeFile = onRequest(flowHttp(writeFileFlow));
export const plan      = onRequest(flowHttp(planFlow));
export const createPr  = onRequest(flowHttp(createPrFlow));
export const files     = onRequest(flowHttp(filesFlow));
export const command   = onRequest(flowHttp(commandFlow));

// ---- Genkit Dev UI --------------------------------------------------
import "@genkit-ai/flow/devui";