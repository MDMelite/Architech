import { describe, it, expect } from "vitest";
import { statusFlow } from "../flows/statusFlow";
describe("statusFlow", () => {
  it("returns not-yet-implemented", async () => {
    const res = await statusFlow();
    expect(res).toEqual({ endpoint: "statusFlow", status: "not-yet-implemented" });
  });
});