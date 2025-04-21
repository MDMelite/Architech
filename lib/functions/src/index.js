import { onRequest } from "firebase-functions/v4";
import express from "express";
import { statusFlow } from "./flows/statusFlow";
import { whoamiFlow } from "./flows/whoamiFlow";
const app = express();
app.get("/status", statusFlow);
app.get("/whoami", whoamiFlow);
// additional flows mounted similarly
export const githubAgent = onRequest(app);
