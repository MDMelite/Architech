# GitHub Agent — Firebase Functions Skeleton

## Product Overview
Architectum GitHub Agent enables AI‑driven, traceable code generation and refactoring via GitHub Pull Requests, using a document‑centric workflow.

## Architecture Highlights
* **Genkit flows** expose each REST endpoint as a Cloud Function.
* **Document store**: conversation markdown lives in Firestore (future step).
* **OpenAPI + Markdown** docs kept in sync by `schema:check`.

## Local Launch
```bash
npm ci
npm run build   # optional tsc
npm run dev     # ts-node emulator with hot reload
firebase emulators:start --only functions