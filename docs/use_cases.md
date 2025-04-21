# Use Cases: AI Agent System Prototype

## 1. Personas

-   **Alex (Software Developer):** Uses the system to get AI assistance (from GPT and Copilot) for generating boilerplate code, writing unit tests, or refactoring existing code within a project hosted on GitHub. Wants minimal disruption to their workflow.
-   **Charlie (AI Agent Developer):** Integrates a specialized AI agent (e.g., a documentation generator) with the system. Needs clear APIs and a reliable way to pass context and instructions to other agents (like the GitHub Agent or Copilot).
-   **Sam (System Operator/Monitor):** Oversees the system's operation. Needs visibility into ongoing conversations, agent statuses, and the ability to intervene if a workflow gets stuck.

## 2. Use Case Scenarios

### Use Case 1: Generate Boilerplate Code via External Agent & Copilot

-   **Goal:** Alex wants to generate initial code for a new React component based on a brief description.
-   **Persona:** Alex (initiating via an external tool/GPT), Charlie (representing the external GPT), Sam (monitoring).
-   **Interaction Path:**
    1.  Alex provides a description to an external GPT-based agent (e.g., "Create a React functional component for a user profile card showing name, email, and avatar").
    2.  The external agent (Charlie's domain) calls the API Gateway's `/command` endpoint with `create_conversation`.
    3.  Gateway returns a `session_id`.
    4.  External agent calls `/command` again with `add_prompt`, providing the `session_id`, context (e.g., project structure, relevant existing components), and the instruction for Copilot.
    5.  The GitHub Agent generates `conversations/[session_id]/001_prompt.md`.
    6.  A mechanism (manual or automated) opens `001_prompt.md` in VS Code.
    7.  Alex (or an automated process) interacts with GitHub Copilot using the prompt content.
    8.  Alex saves the generated code and explanation into `conversations/[session_id]/001_response.md`.
    9.  The GitHub Agent detects the response file.
    10. The external agent calls `/command` with `get_response`, retrieving the content of `001_response.md`.
    11. The external agent parses the response and potentially calls `/write-file` via the Gateway/GitHub Agent to save the generated code to the appropriate project location (e.g., `src/components/UserProfileCard.tsx`).
    12. Sam can view the conversation steps and status via the dashboard.
-   **Success Criteria:**
    -   A new conversation directory is created.
    -   A prompt document is successfully generated.
    -   A response document containing Copilot's output is saved.
    -   The external agent successfully retrieves the response.
    -   The generated code is optionally written to the target file path.

### Use Case 2: Refactor Existing Code using Copilot Handoff

-   **Goal:** Alex wants to refactor a complex function identified by an analysis tool (represented by Charlie's agent).
-   **Persona:** Alex, Charlie, Sam.
-   **Interaction Path:**
    1.  Charlie's analysis agent identifies a function needing refactoring (`src/lib/utils.ts#calculateTotals`).
    2.  Charlie's agent calls `create_conversation`.
    3.  Charlie's agent reads the relevant file (`/files` endpoint) to get context.
    4.  Charlie's agent calls `add_prompt`, including the file content, the function name, and the instruction (e.g., "Refactor the calculateTotals function for better readability and efficiency").
    5.  GitHub Agent creates `conversations/[session_id]/001_prompt.md`.
    6.  Prompt is opened in VS Code; Alex interacts with Copilot for refactoring suggestions.
    7.  Alex saves the refactored code and rationale in `conversations/[session_id]/001_response.md`.
    8.  GitHub Agent detects the response.
    9.  Charlie's agent calls `get_response`.
    10. Charlie's agent parses the refactored code and uses `/write-file` to update `src/lib/utils.ts`.
    11. Optionally, Charlie's agent could trigger `/create-pr` to propose the changes.
    12. Sam monitors the process via the dashboard.
-   **Success Criteria:**
    -   Refactoring prompt is generated with correct code context.
    -   Copilot interaction yields refactoring suggestions.
    -   Response document is saved and retrieved.
    -   Target source file is updated with the refactored code.
    -   (Optional) A Pull Request is created with the changes.

### Use Case 3: Document a Feature with AI Assistance

-   **Goal:** Alex needs to add documentation for a newly implemented feature.
-   **Persona:** Alex, Charlie (representing a documentation agent).
-   **Interaction Path:**
    1.  Alex triggers the documentation process (perhaps via a comment or command).
    2.  Charlie's documentation agent gathers context: reads relevant source files (`/files`), potentially looks at recent commit messages (future capability).
    3.  Agent calls `create_conversation`.
    4.  Agent calls `add_prompt` with context and instruction (e.g., "Generate markdown documentation for the new User Profile feature, explaining its usage and API. Reference files: UserProfileCard.tsx, api/user.ts").
    5.  GitHub Agent generates `001_prompt.md`.
    6.  Prompt is opened in VS Code; Alex uses Copilot to draft the documentation based on the prompt.
    7.  Alex saves the documentation draft in `001_response.md`.
    8.  GitHub Agent detects the response.
    9.  Charlie's agent retrieves the draft via `get_response`.
    10. Agent uses `/write-file` or `/plan` (if writing to `docs/`) to save the documentation (e.g., `docs/features/user_profile.md`).
-   **Success Criteria:**
    -   Documentation prompt is generated with relevant context.
    -   Copilot assists in drafting the documentation.
    -   Response document is saved and retrieved.
    -   Documentation file is created/updated in the repository.

### Use Case 4: Monitor System Health

-   **Goal:** Sam needs to check if the system components are operational.
-   **Persona:** Sam.
-   **Interaction Path:**
    1.  Sam accesses the web dashboard.
    2.  Dashboard backend calls the API Gateway's `/status` endpoint.
    3.  Gateway forwards the request to the GitHub Agent's `/status` endpoint.
    4.  GitHub Agent returns `{"status": "ok"}`.
    5.  Gateway relays the response.
    6.  Dashboard displays the status (e.g., a green indicator).
    7.  Sam views the recent activity log populated by API calls.
-   **Success Criteria:**
    -   `/status` endpoint returns an affirmative health check.
    -   Dashboard accurately reflects the system status.
    -   Recent commands/events are visible in the dashboard log.
