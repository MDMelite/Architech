# GitHub Agent API Schema

## Overview
The GitHub Agent exposes a document‑centric REST API that lets external AI agents create, track, and refine code changes via GitHub.  It runs behind an API Gateway and routes commands to flows implemented with Google Genkit inside Firebase Functions.

## Endpoints
1. GET /status – health check  
2. GET /whoami – environment details  
3. POST /log – append entry to logs/orion.md  
4. POST /write-file – write/overwrite a repo file  
5. POST /plan – create a plan doc under /docs  
6. POST /create-pr – branch, commit, PR  
7. GET /files – list files or return file content  
8. POST /command – multi‑command dispatcher  
9. GET / – HTML dashboard  
10. GET /events – SSE stream (optional)

All POSTs expect **application/json**.