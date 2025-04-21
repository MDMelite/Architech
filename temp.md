AI2AI_PROTOCOL_V1.3
TO: copilot
FROM: orion
DATE: 2025-04-22T00:00Z
SUBJECT: Architectum GitHub‑Agent — Iterative Development Plan

===== CURRENT SNAPSHOT =====
REPO: github.com/MDMelite/Architech.git
MAIN HEAD: 7c3b1f2  (GitHub‑Agent skeleton merge)
OPEN PRs:
  • #124  (merged)  skeleton
  • #125  ci-bootstrap  <-- pending, Scout owner
DIRECTORY HIGHLIGHTS:
  docs/
    api_schema.md  (human contract, synced 21‑Apr)
    tasks/board.md  (master task list, updated 21‑Apr)
  api/github-agent/
    openapi.yaml  (spec, matches api_schema)
  functions/
    src/index.ts  (Genkit flow stubs)
    schemaCheck.ts  (placeholder diff)
  .github/workflows/ci.yml  (pending in PR #125)

CI STATUS: passing on main; schema gate placeholder diff.

===== WORKFLOW PRIMER =====
• each new task => create branch feat/<task‑id> off main.
• commit atomically; push -> PR.
• PR title prefix “[T‑ID]”.
• run tests + schema:check; must pass before review.
• update docs/tasks/board.md row Status to REVIEW when PR opened; DONE when merged.

===== IMMEDIATE NEXT TASKS (ASSIGNABLE) =====
T‑002  CI bootstrap workflow               owner: Scout     status: REVIEW   priority: P0
T‑003  Dashboard MVP page                  owner: Orion     status: IN‑PROG  priority: P1
T‑004  Robust endpoint schema gate         owner: Guardian  status: BACKLOG  priority: P0
T‑005  /status flow real logic             owner: Prime     status: BACKLOG  priority: P1
T‑006  /whoami flow real logic             owner: Prime     status: BACKLOG  priority: P1
T‑007  Conversation template markdowns     owner: Sage      status: BACKLOG  priority: P2
T‑009  GitHub token secret in Firebase     owner: Commander status: BACKLOG  priority: P0

===== COPILOT ACTION QUEUE =====
1. pick T‑005:
   a. branch feat/T‑005-status-flow
   b. modify functions/src/index.ts:
        – replace statusFlow body with dynamic health probe:
          return { endpoint: "/status", status: "online", ts: new Date().toISOString() }
   c. add unit test statusFlow.test.ts hitting local handler, expect status=online.
   d. docs/tasks/board.md: set T‑005 status IN‑PROGRESS.
   e. commit, push, open PR "[T‑005] implement status flow".

2. pick T‑006 after T‑005 merged.

3. when T‑004 (schema gate) becomes READY, update functions/schemaCheck.ts with endpoint‑level comparison.

===== ACCEPTANCE CRITERIA TEMPLATE =====
• functionality works locally (npm run dev) and in CI.
• unit tests in Vitest cover happy path and one error path.
• docs updated (board.md and function README if signature changed).
• CI green; Guardian reviewer passes.

END_OF_MESSAGE
