import { describe, it, expect } from "vitest";
import { statusFlow } from "../flows/statusFlow";

describe("statusFlow", () => {
  it("returns not-yet-implemented", async () => {
    const res = await statusFlow();
    expect(res).toEqual({ endpoint: "statusFlow", status: "not-yet-implemented" });
  });

  it("returns online status and ISO timestamp", async () => {
    const result = await statusFlow();
    expect(result.endpoint).toBe("/status");
    expect(result.status).toBe("online");
    expect(typeof result.ts).toBe("string");
    // Optionally: check ISO format
    expect(new Date(result.ts).toISOString()).toBe(result.ts);
  });
});