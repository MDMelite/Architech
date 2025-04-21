import { flowHttp } from "genkit";
export const statusFlow = flowHttp(() => ({
  endpoint: "statusFlow",
  status: "not-yet-implemented"
}));