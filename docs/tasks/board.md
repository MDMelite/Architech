| ID    | Title                                      | Owner     | Status       | Priority | Notes                              |
|-------|--------------------------------------------|-----------|--------------|----------|------------------------------------|
| T-001 | Genkit flow skeleton merged to main       | Prime     | DONE         | P0       | PR #124 merged 7c3b1f2            |
| T-002 | CI bootstrap workflow (.github/workflows/ci.yml) | Scout     | IN-PROGRESS | P0       | Branch feature/ci-bootstrap       |
| T-003 | Dashboard MVP: ping /status & /whoami     | Orion     | IN-PROGRESS  | P1       | src/pages/index.tsx               |
| T-004 | Robust endpoint schema gate (SCHEMA-GATE-001) | Guardian  | BACKLOG      | P0       | replace placeholder diff          |
| T-005 | Implement /status real logic + Firestore heartbeat | Prime     | IN-PROGRESS | P1       | depends on T-002 CI               |
| T-006 | Implement /whoami real logic (env introspection) | Prime     | BACKLOG      | P1       | after T-005                       |
| T-007 | Create conversation template files        | Sage      | BACKLOG      | P2       | templates/prompt.md, response.md  |
| T-008 | Docs: Architecture diagram in docs/architecture_overview.png | Orion     | BACKLOG      | P3       | optional but nice                 |
| T-009 | GitHub token secret setup in Firebase     | Commander | BACKLOG      | P0       | needed before create-pr flow      |
| T-010 | Dgraph adapter PoC (future phase)         | Prime     | BACKLOG      | P4       | —                                  |