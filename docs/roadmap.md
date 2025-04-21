# Project Roadmap: AI Agent System Prototype

This roadmap outlines the initial phases for developing the AI Agent System prototype, focusing on establishing the core document-based workflow for GitHub Copilot integration.

## Phase 1: Planning & Foundation (Complete)

-   **Goal:** Define the prototype scope, requirements, and architecture.
-   **Activities:**
    -   Define system overview and goals.
    -   Detail functional and non-functional requirements.
    -   Outline core use cases and personas.
    -   Design the initial system architecture.
    -   Define document formats (prompt/response).
    -   Identify initial agents and their roles.
    -   Create a glossary of terms.
-   **Deliverables:**
    -   `product_overview.md`
    -   `requirements.md`
    -   `use_cases.md`
    -   `architecture_overview.md`
    -   `roadmap.md` (this document)
    -   `agents_manifest.md`
    -   `glossary.md`

## Phase 2: Scaffolding & Core API (Est. 1-2 Weeks)

-   **Goal:** Set up the basic project structure and implement core API endpoints.
-   **Activities:**
    -   Initialize project repository.
    -   Set up basic FastAPI applications for API Gateway and GitHub Agent.
    -   Implement basic `/status` and `/whoami` endpoints.
    -   Implement `/command` endpoint on GitHub Agent with initial routing.
    -   Implement `create_conversation` command logic (directory creation).
    -   Implement `add_prompt` command logic (basic document generation from input args, saving to file system).
    -   Implement `get_response` command logic (checking for file existence and reading content).
    -   Implement basic API Gateway forwarding logic.
    -   Set up basic logging.
-   **Deliverables:**
    -   Runnable API Gateway service.
    -   Runnable GitHub Agent service.
    -   Functional `/command` endpoints for conversation/prompt/response handling.
    -   Basic file system interaction for conversations.

## Phase 3: Document Workflow & GitHub Integration (Est. 2-3 Weeks)

-   **Goal:** Implement the full document-based workflow and basic GitHub operations.
-   **Activities:**
    -   Refine prompt/response document templates.
    -   Enhance `add_prompt` to use templates.
    -   Implement GitHub Agent endpoints: `/write-file`, `/files`, `/log`, `/plan`.
    -   Integrate GitHub API client library.
    -   Implement `/create-pr` endpoint logic (branch creation, commit, PR).
    -   Develop a simple script or procedure for the VS Code/Copilot interaction step (detecting prompts, guiding user, saving responses).
    -   Implement basic response parsing in `get_response` or a separate mechanism.
-   **Deliverables:**
    -   Fully functional document generation and retrieval flow.
    -   Ability to perform basic file operations via the agent.
    -   Ability to create a Pull Request on GitHub via the agent.
    -   Defined process for the human/Copilot interaction step.

## Phase 4: Basic Dashboard & Monitoring (Est. 1 Week)

-   **Goal:** Provide basic visibility into the system's operation.
-   **Activities:**
    -   Develop a simple web UI (e.g., using FastAPI static files or a simple frontend framework).
    -   Display system status (calling `/status`).
    -   Show a log of recent commands/events received by the GitHub Agent.
    -   (Optional) List active conversation sessions.
-   **Deliverables:**
    -   Functional web dashboard accessible via a browser.
    -   Display of agent status and recent activity.

## Phase 5: MVP & Feedback Loop (Est. 1 Week)

-   **Goal:** Package the prototype, test end-to-end use cases, and gather initial feedback.
-   **Activities:**
    -   Test the primary use cases (e.g., code generation, refactoring) end-to-end.
    -   Document setup and usage instructions.
    -   Deploy the services (locally or in a test environment).
    -   Conduct internal demos and gather feedback on usability and effectiveness.
-   **Deliverables:**
    -   Deployable prototype package.
    -   Test results and documentation.
    -   Feedback summary.

## Phase 6: Iteration (Ongoing)

-   **Goal:** Refine the prototype based on feedback and implement "Nice-to-Have" features.
-   **Activities:**
    -   Prioritize feedback and bug fixes.
    -   Implement selected enhancements (e.g., SSE event stream, improved dashboard, better response parsing, session management).
    -   Explore "Stretch Goals" based on project direction (e.g., orchestration, auth, VS Code extension).
-   **Deliverables:**
    -   Updated versions of the prototype.
    -   Potentially new features and architectural improvements.

*Note: Timelines are estimates and may vary based on complexity and resources.*