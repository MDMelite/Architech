# Architecture Overview: AI Agent System Prototype

## 1. System Components

The prototype consists of the following key components:

1.  **External AI System(s):** (e.g., GPT-based agents, specialized tools) - Interact with the system via the API Gateway.
2.  **API Gateway:** (Port 9000) - Public-facing entry point. Handles request translation (schema mapping) and forwards requests to the appropriate internal agent (initially, only the GitHub Agent).
3.  **GitHub Agent:** (Port 8001) - Core service responsible for interacting with the GitHub repository, managing the file system (including conversation documents), and orchestrating the Copilot handoff workflow.
4.  **Document Store (File System):** - Uses the local file system (`conversations/`, `docs/`, project source) to store state, prompts, responses, and plans.
5.  **VS Code + GitHub Copilot:** - The environment where prompt documents are opened, Copilot interaction occurs, and response documents are saved (manual or semi-automated step).
6.  **Web Dashboard:** (Served by GitHub Agent or a separate UI service) - Provides monitoring and potentially interaction capabilities.

## 2. Architecture Style

-   **Microservices-like:** Although simple initially, the Gateway and GitHub Agent are distinct services, allowing for independent scaling and development.
-   **API-Driven:** Interactions between components primarily occur via RESTful APIs.
-   **Document-Based Workflow:** The core logic for Copilot integration revolves around creating, sharing, and monitoring structured markdown documents on the file system.
-   **Event-Driven (Optional):** Potential for incorporating Server-Sent Events (SSE) for real-time updates from the GitHub Agent to the Dashboard or other subscribed clients.

## 3. Data Flow and Interactions

### Standard Command Flow (e.g., Write File)

```mermaid
sequenceDiagram
    participant Ext as External Agent
    participant GW as API Gateway (9000)
    participant GA as GitHub Agent (8001)
    participant FS as File System
    participant GH as GitHub API

    Ext->>+GW: POST /command (command=write_file, args={path: "src/x.py", content: "..."})
    GW->>+GA: POST /command (command=write_file, args={path: "src/x.py", content: "..."})
    Note over GA, FS: Execute write operation
    GA->>FS: Write content to ./src/x.py
    FS-->>GA: Success/Failure
    GA-->>-GW: Response (e.g., {"status": "ok"})
    GW-->>-Ext: Response
```

### Copilot Handoff Workflow (Prompt Generation & Response Retrieval)

```mermaid
sequenceDiagram
    participant Ext as External Agent
    participant GW as API Gateway (9000)
    participant GA as GitHub Agent (8001)
    participant FS as File System
    participant VSC as VS Code + Copilot
    participant Human as Human Operator

    %% Conversation Creation %%
    Ext->>+GW: POST /command (command=create_conversation)
    GW->>+GA: POST /command (command=create_conversation)
    Note over GA, FS: Create session dir
    GA->>FS: mkdir conversations/[session_id]
    FS-->>GA: Success
    GA-->>-GW: Response ({"session_id": "xyz"})
    GW-->>-Ext: Response

    %% Prompt Addition %%
    Ext->>+GW: POST /command (command=add_prompt, args={session_id: "xyz", ...})
    GW->>+GA: POST /command (command=add_prompt, args={session_id: "xyz", ...})
    Note over GA, FS: Generate prompt.md from template
    GA->>FS: Write conversations/xyz/001_prompt.md
    FS-->>GA: Success
    GA-->>-GW: Response ({"prompt_id": "001_prompt.md"})
    GW-->>-Ext: Response

    %% Copilot Interaction (Manual/Semi-Automated) %%
    Note over FS, VSC: Detect/Open 001_prompt.md
    VSC->>Human: Show prompt
    Human->>VSC: Interact with Copilot, edit response
    VSC->>FS: Save conversations/xyz/001_response.md

    %% Response Retrieval %%
    Ext->>+GW: POST /command (command=get_response, args={session_id: "xyz", prompt_id: "001_prompt.md"})
    GW->>+GA: POST /command (command=get_response, args={session_id: "xyz", prompt_id: "001_prompt.md"})
    Note over GA, FS: Check for and read response.md
    GA->>FS: Read conversations/xyz/001_response.md
    FS-->>GA: File content
    GA-->>-GW: Response ({"response_content": "..."})
    GW-->>-Ext: Response
```

### Event Notification Flow (Optional)

```mermaid
sequenceDiagram
    participant Dashboard as Web Dashboard
    participant GA as GitHub Agent (8001)
    participant FS as File System

    Dashboard->>+GA: GET /events (SSE Connection)
    Note over GA, FS: Agent monitors FS or internal queue

    %% Later, when a response is detected %%
    FS-->>GA: Notify response saved (e.g., conversations/xyz/001_response.md)
    GA->>GA: Add event to queue
    Note over GA, Dashboard: Push event via SSE
    GA-->>-Dashboard: data: {"event": "response_ready", "session_id": "xyz", "prompt_id": "001_prompt.md"}


```

## 4. Service Boundaries & Responsibilities

-   **API Gateway:**
    -   Expose public API.
    -   Schema translation.
    -   Request routing to internal agents.
    -   (Future) Authentication/Authorization.
-   **GitHub Agent:**
    -   Implement core business logic for file operations, Git actions, PR creation.
    -   Manage the `conversations/` directory structure.
    -   Generate prompt documents and parse response documents.
    -   Interact with GitHub API.
    -   Serve the dashboard UI (or provide API for it).
    -   (Optional) Publish events via SSE.
-   **Document Store (File System):**
    -   Persist conversation state (prompts, responses).
    -   Store generated plans/documentation.
    -   Provide the shared medium for Copilot handoff.
-   **VS Code + Copilot:**
    -   Provide the UI/environment for human interaction with Copilot based on generated prompts.
    -   Save Copilot suggestions into response documents.

## 5. Protocols

-   **HTTP/REST:** For communication between External Agents, Gateway, and GitHub Agent.
-   **File System I/O:** For managing conversation documents and project files.
-   **HTTPS:** For communication with the GitHub API.
-   **SSE (Server-Sent Events):** (Optional) For real-time updates from GitHub Agent to clients like the dashboard.
