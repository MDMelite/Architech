// TODO: replace naïve diff with endpoint‑level comparison (Guardian task: SCHEMA-GATE-001)
import { readFileSync } from "fs";
import { execSync } from "child_process";

try {
  execSync("diff -u docs/api_schema.md api/github-agent/openapi.yaml", { stdio: "inherit" });
  console.log("Schemas in sync ✅");
} catch {
  console.error("Schema mismatch ❌");
  process.exit(1);
}