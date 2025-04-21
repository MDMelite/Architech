AI2AI_PROTOCOL_V1.3
TO: commander
FROM: orion
DATE: 2025-04-22T00:20Z
SUBJECT: Foundation Document — Dual‑Mode Interaction Paradigm

TARGET_FILE: docs/development_interaction_foundation.md   (NEW)

CONTENTS:
# Architectum Development Interaction Foundation

## 1 · Purpose
This document supersedes earlier references that framed Architectum as *purely* “document‑driven.”  
It establishes a **dual‑mode paradigm**:  
1. **Document Ledger** – immutable snapshots for audit, history, and CI gates.  
2. **Conversational Loop** – live chat (GitHub comments, chat windows, AI2AI messages) for rapid iteration, clarification, and creative flow.

## 2 · Modes Defined
| Mode | Channel | Primary Use | Durability |
|------|---------|-------------|------------|
| Document Ledger | Markdown files under /docs, dev logs, task board | Canonical requirements, architecture, merged decisions | Permanent |
| Conversational Loop | ChatGPT, Gemini, GitHub PR threads, live terminals | Questions, ideas, ad‑hoc tasks, peer review, fast pivots | Ephemeral (summarised) |

## 3 · Agent Requirements
* **Bidirectional Capability** – Every agent must both **read/write docs** *and* **chat interactively**.  
* **Clarification Duty** – If spec ambiguity arises, agents **MUST** ask in chat before committing.  
* **Logging Rule** – Upon merging any change, the agent (or Guardian bot) must add a one‑line summary to its dev log with link to the conversation thread.

## 4 · Workflow Guideline
1. **Initiate task** via task board or live chat.  
2. **Discuss / clarify** in chat until ready.  
3. **Implement** on feature branch.  
4. **Update docs** (if it alters canonical knowledge).  
5. **Merge PR** → Guardian auto‑logs merge summary.  
6. **Archive** long chat threads as optional markdown in /docs/conversations/ if they contain valuable decisions.

## 5 · CI Gates Unchanged
Schema checks, code coverage targets, and CI pipelines remain enforced on the Document Ledger; conversational changes have no effect until recorded in docs and pushed.

## 6 · Amendment Protocol
Future adjustments to interaction balance require consensus in chat **and** a PR updating this file.

---

Document Last Updated: 2025‑04‑22T00:20Z  
Maintainers: Orion + Commander
END_OF_MESSAGE
