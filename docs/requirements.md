# Requirements: AI Agent System Prototype

## 1. Functional Requirements

### Must-Have

-   **FR1.1:** System must provide an API gateway to receive external requests (e.g., from a GPT-based agent).
-   **FR1.2:** API Gateway must translate incoming requests to the format expected by the GitHub Agent (e.g., mapping "files" to "changes").
-   **FR1.3:** GitHub Agent must provide API endpoints for:
    -   Status check (`/status`)
    -   Environment info (`/whoami`)
    -   Logging (`/log`)
    -   Writing files (`/write-file`)
    -   Creating plans/docs (`/plan`)
    -   Creating GitHub PRs (`/create-pr`)
    -   Listing/reading files (`/files`)
    -   Generic command routing (`/command`)
-   **FR1.4:** GitHub Agent must implement the document-based workflow for GitHub Copilot interaction:
    -   Generate structured prompt markdown files in a dedicated directory (`conversations/`).
    -   Provide a mechanism (API endpoint or monitored directory) to detect and ingest response markdown files.
-   **FR1.5:** Define and implement a structured format for prompt documents (including context, instruction, expected output, references).
-   **FR1.6:** Define and implement a structured format for response documents (linking to the prompt, including solution, explanation).
-   **FR1.7:** Implement the `/command` endpoint extensions for:
    -   `create_conversation`: Create a new session directory.
    -   `add_prompt`: Generate and save a prompt markdown file in a session directory.
    -   `get_response`: Check for and retrieve the content of a response file.
-   **FR1.8:** Basic web dashboard displaying system status and recent activity/commands.
-   **FR1.9:** System must manage conversation state using the file system structure (`conversations/[session_id]/`).
-   **FR1.10:** System must support a tool discovery endpoint (`/tools`) or file (`tools.json`) to expose available commands and arguments to LLMs.

### Nice-to-Have

-   **FR2.1:** Implement an event notification system (e.g., SSE at `/events`) to push updates about conversation progress.
-   **FR2.2:** Web dashboard includes a basic conversation view (list of prompts/responses).
-   **FR2.3:** Web dashboard includes basic document preview.
-   **FR2.4:** GitHub Agent automatically parses code blocks and explanations from response documents.
-   **FR2.5:** Basic session management to handle multiple concurrent conversations.

### Stretch Goals

-   **FR3.1:** Implement a more sophisticated agent orchestration layer.
-   **FR3.2:** Web dashboard allows editing/manual intervention in documents.
-   **FR3.3:** Implement a basic authorization framework for API endpoints.
-   **FR3.4:** Automated feedback loop mechanism based on response evaluation.
-   **FR3.5:** VS Code extension to streamline the Copilot interaction phase.

## 2. Non-Functional Requirements

### Must-Have

-   **NFR1.1:** The document-based workflow must be traceable; prompts and responses must be stored persistently.
-   **NFR1.2:** The core API services (Gateway, GitHub Agent) must be independently deployable (e.g., as separate processes/containers).
-   **NFR1.3:** System must interact with a GitHub repository using standard Git operations and GitHub API calls.
-   **NFR1.4:** Use Python (FastAPI suggested) for the backend agent implementations.

### Nice-to-Have

-   **NFR2.1:** Asynchronous processing for long-running tasks (e.g., GitHub operations).
-   **NFR2.2:** Basic error handling and logging for API requests and agent operations.
-   **NFR2.3:** Use Markdown for all document-based interactions (prompts, responses, plans).

### Stretch Goals

-   **NFR3.1:** Scalability considerations for handling a larger number of agents or conversations.
-   **NFR3.2:** Robust error recovery mechanisms.
-   **NFR3.3:** Document versioning for conversation files.
-   **NFR3.4:** Security considerations for API access and file system interactions.

## 3. Constraints & Assumptions

-   **C1:** The prototype focuses on GitHub as the target repository platform.
-   **C2:** GitHub Copilot interaction relies on a human operator using VS Code with the Copilot extension, or an automated script monitoring the `conversations` directory.
-   **C3:** Initial implementation uses the file system as the primary store for conversation state and documents.
-   **C4:** External AI systems (like GPT) are assumed to be capable of making HTTP requests to the API Gateway.
-   **A1:** Access to GitHub API (potentially requiring tokens/credentials) is available to the GitHub Agent.
-   **A2:** Development environment includes Python and necessary tooling (like VS Code for the Copilot part).
