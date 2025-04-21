import { describe, it, expect } from "vitest";
import { whoamiFlow } from "../flows/whoamiFlow";
describe("whoamiFlow", () => {
  it("returns not-yet-implemented", async () => {
    const res = await whoamiFlow();
    expect(res).toEqual({ endpoint: "whoamiFlow", status: "not-yet-implemented" });
  });
});