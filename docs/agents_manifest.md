# Agents Manifest: AI Agent System Prototype

This document defines the initial agents involved in the system, their roles, and capabilities.

## 1. API Gateway Agent

-   **Name:** `api-gateway`
-   **Role:** Public entry point, request validation, schema translation, routing.
-   **Capabilities:**
    -   Listens for incoming HTTP requests on Port 9000.
    -   Validates basic request structure.
    -   Translates specific incoming request fields if needed (e.g., mapping `files` key to `changes` key for backward compatibility, though the primary interaction is via `/command`).
    -   Forwards validated requests to the appropriate internal agent (initially, only the GitHub Agent).
    -   Relays responses back to the original caller.
-   **Endpoints Owned:**
    -   `/status` (may forward to GitHub Agent)
    -   `/command` (forwards to GitHub Agent)
    -   *(Potentially others, primarily acting as a proxy)*
-   **Tools/Commands Accessed:** None directly. Primarily network communication (HTTP requests/responses).

## 2. GitHub Agent

-   **Name:** `github-agent`
-   **Role:** Core workflow orchestrator, GitHub interaction manager, document lifecycle manager, state keeper.
-   **Capabilities:**
    -   Listens for incoming HTTP requests on Port 8001 (typically from the API Gateway).
    -   Manages the lifecycle of conversation documents (`conversations/` directory):
        -   Creates conversation sessions.
        -   Generates structured prompt markdown files based on templates and input.
        -   Detects and provides access to response markdown files.
    -   Interacts with the local file system to read/write project files.
    -   Uses Git commands (via terminal or library) and GitHub API calls to:
        -   Create branches.
        -   Commit changes.
        -   Create Pull Requests.
        -   List/read repository files.
    -   Maintains system logs (`logs/orion.md`).
    -   Serves a basic web dashboard for monitoring.
    -   (Optional) Pushes real-time updates via SSE.
-   **Endpoints Owned (on Port 8001):**
    -   `/status`: Reports health.
    -   `/whoami`: Reports environment info.
    -   `/log`: Appends to the Orion log.
    -   `/write-file`: Writes content to a specified file path.
    -   `/plan`: Creates markdown files (typically in `docs/`).
    -   `/create-pr`: Orchestrates branch, commit, and PR creation on GitHub.
    -   `/files`: Lists directory contents or reads a specific file.
    -   `/command`: Handles complex operations like `create_conversation`, `add_prompt`, `get_response`.
    -   `/`: Serves the dashboard UI.
    -   `/events` (Optional): SSE endpoint.
-   **Tools/Commands Accessed:**
    -   File System: Read, write, list directories, create directories.
    -   Terminal: `git` commands (if not using a library).
    -   Network: GitHub API (HTTPS), potentially internal communication.
    -   Internal Libraries: Template engines (e.g., Jinja2), Markdown parsing libraries.

## 3. External Agent(s) (Conceptual)

-   **Name:** Varies (e.g., `gpt-code-generator`, `documentation-agent`, `refactoring-analyzer`)
-   **Role:** Initiates workflows, provides high-level instructions or analysis.
-   **Capabilities:**
    -   Formulates tasks and goals for the AI Agent System.
    -   Constructs API calls to the API Gateway.
    -   Processes responses received from the system.
    -   May have specialized knowledge or access to external tools/models (e.g., LLMs like GPT).
-   **Endpoints Owned:** N/A (They are clients of the API Gateway).
-   **Tools/Commands Accessed:** Primarily HTTP client capabilities to interact with the API Gateway.

## 4. Human Operator (via VS Code + Copilot)

-   **Name:** Human Developer
-   **Role:** Interacts with GitHub Copilot based on generated prompts, reviews suggestions, saves responses.
-   **Capabilities:**
    -   Reads and understands prompt documents.
    -   Uses GitHub Copilot within VS Code to generate code, explanations, etc.
    -   Edits and refines Copilot suggestions.
    -   Saves the final output into the designated response document.
-   **Endpoints Owned:** N/A.
-   **Tools/Commands Accessed:**
    -   VS Code editor.
    -   GitHub Copilot extension.
    -   File System access (to open prompts and save responses).
Would you like me to generate a /tools endpoint definition for main.py and register this as a tools.json mirror? You’ve done the architecture. I’ll write the API.