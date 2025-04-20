# **App Name**: Architectum IDE

## Core Features:

- Automated Prompt Generation: Generate formatted prompt documents for GitHub Copilot, including context, instructions, expected output, and code references, based on the current task and session data using an AI tool.
- Interactive Dashboard: Provide a real-time, web-based dashboard for monitoring the workflow between AI agents and GitHub Copilot, displaying document previews, message history, and agent statuses.
- Enhanced API Layer: Extend the current API Gateway and GitHub Agent to support bidirectional communication and event-based architecture using webhooks for real-time updates.
- Agent Orchestration: Implement an orchestration layer to coordinate multiple AI agents, manage document flow, handle retry logic, and provide traceability of decision-making.
- Conversation Explorer: Allow users to browse the directory structure and download conversation files (contexts, prompts and responses).
- Agent Management: Enable the creation of additional agents and assign them into a particular role with unique responsibilities, knowledge, and skill sets based on knowledge documents. Include interactive questioning to clarify or request more information, and self improvement through reflection. Provide an interface to manage creation and editing of agents.

## Style Guidelines:

- Primary color: Dark blue (#24292F) for a professional look.
- Secondary color: Light gray (#F6F8FA) for contrast and readability.
- Accent color: Teal (#2E7D32) for interactive elements and highlights.
- Clean, minimalist design with clear separation of concerns.
- Use simple, consistent icons to represent agent statuses and actions.
- Subtle animations for loading states and transitions to improve user experience.

## Original User Request:
# AI Agent System with GitHub Copilot Integration Prototype

## Current System Overview

The Architectum system is a multi-agent architecture designed for automated code generation, documentation, and repository management. It consists of two primary components:

1. **API Gateway** (Port 9000)
   - Acts as a public entry point for external AI systems (like GPT)
   - Translates input schemas (converts "files" key to "changes" key)
   - Forwards requests to the GitHub Agent

2. **GitHub Agent** (Port 8001)
   - Provides multiple endpoints for file operations, PR creation, and system status
   - Interacts with GitHub API to create branches, commits, and PRs
   - Has recently been enhanced with a document-based method for GitHub Copilot integration

The system currently operates in a request-response model where commands flow through the Gateway to the GitHub Agent, which then performs operations against a GitHub repository.

## Current Endpoints in GitHub Agent

- `/status` - Simple health check
- `/whoami` - Returns environment information
- `/log` - Appends log entries to logs/orion.md
- `/write-file` - Creates/updates files at specified paths
- `/plan` - Creates markdown files in docs directory
- `/create-pr` - Creates pull requests on GitHub
- `/files` - Lists directories or reads file contents
- `/command` - Generic command router (new MCP-style endpoint)
- `/` - Dashboard UI showing recent commands and events

## Proposed Integration with GitHub Copilot

A document-based workflow has been implemented for GitHub Copilot integration:

1. The GitHub Agent generates specially formatted Markdown files in a dedicated directory
2. These files are opened in VS Code where GitHub Copilot can provide assistance
3. The human operator interacts with Copilot and saves responses
4. A workflow script monitors for responses and processes them

## Prototype Requirements

### 1. Enhanced Document-Based Workflow

Design a seamless document-based workflow between AI agents and GitHub Copilot with the following features:

- **Automated Prompt Generation**: Create a system where AI agents (e.g., GPT) can automatically generate prompts for GitHub Copilot through API calls
- **Structured Document Format**: Define a consistent format for prompt documents that includes:
  - Context section with relevant project information
  - Clear instruction section
  - Code references or snippets where applicable
  - Expected output format specification
  - Evaluation criteria

- **Response Processing**: Create a mechanism to parse and process GitHub Copilot's responses, including:
  - Code extraction
  - Rationale extraction
  - Automatic feedback loop

### 2. Interactive Interface

Design a web-based dashboard that provides:

- Real-time visibility into the workflow between agents
- Document preview and editing capabilities
- Message history and threading
- Status monitoring for all agents
- Manual intervention options

### 3. Enhanced API Layer

Extend the current API Gateway and GitHub Agent to support:

- **Bidirectional Communication**: Enable both push and pull models for communication
- **Event-Based Architecture**: Implement webhooks or server-sent events for real-time updates
- **Session Management**: Support for long-running conversations across multiple documents
- **Authorization Framework**: Role-based access for different agents and humans

### 4. Agent Orchestration

Design an orchestration layer that:

- Coordinates multiple AI agents (e.g., GPT, GitHub Copilot, specialized tools)
- Manages document flow between agents
- Handles retry logic and error scenarios
- Provides traceability of decision-making across the system

## Technical Implementation Details

### Document-Based Workflow Implementation

The core of the system should revolve around a document store with the following characteristics:

```
/workspaces/architectum-system/
├── docs/             # High-level planning documents
├── agents/           # Agent-specific configuration
├── conversations/    # Conversation history and state
│   ├── [session_id]/
│   │   ├── context.json       # Session context and metadata
│   │   ├── 001_prompt.md      # Initial prompt
│   │   ├── 001_response.md    # Response to initial prompt
│   │   ├── 002_prompt.md      # Follow-up prompt
│   │   └── ...
├── templates/        # Document templates
└── api/              # API services
    ├── gateway/      # Enhanced gateway service
    └── github-agent/ # GitHub operations service
```

### Document Format Specification

Each prompt document should follow this structure:

```markdown
# Prompt: [Brief Title]

## Session Information
- Session ID: [unique_identifier]
- Timestamp: [ISO timestamp]
- Origin: [agent_id or "human"]
- Target: [agent_id, e.g., "github-copilot"]

## Context
[Relevant context from the system, previous conversation, or workspace]

## Instruction
[Clear, specific instructions for the target agent]

## Expected Output
[Format and requirements for the response]

## References
[Code snippets, documentation links, or other relevant material]
```

Response documents should follow:

```markdown
# Response: [Brief Title]

## Session Information
- In Reply To: [prompt_id]
- Timestamp: [ISO timestamp]
- Agent: [agent_id, e.g., "github-copilot"]

## Solution
[The main content of the response]

## Explanation
[Reasoning behind the solution]

## Next Steps
[Suggested follow-up actions or questions]
```

### API Enhancements

Extend the current `/command` endpoint with additional operations:

```python
@app.post("/command")
def command_router(command: str, args: dict):
    # Existing commands...
    
    if command == "create_conversation":
        # Create a new conversation session
        session_id = create_unique_id()
        session_dir = CONVERSATIONS_DIR / session_id
        os.makedirs(session_dir, exist_ok=True)
        return {"session_id": session_id}
        
    elif command == "add_prompt":
        # Add a prompt to an existing conversation
        session_id = args["session_id"]
        title = args["title"]
        context = args["context"]
        instruction = args["instruction"]
        # Generate document from template
        # ...
        
    elif command == "get_response":
        # Check for and retrieve response to a prompt
        session_id = args["session_id"]
        prompt_id = args["prompt_id"]
        # ...
```

### Event Notification System

Implement an event system for real-time updates:

```python
@app.get("/events")
async def event_stream(request: Request):
    # Set up SSE headers
    async def event_generator():
        while True:
            if len(event_queue) > 0:
                event = event_queue.pop(0)
                yield f"data: {json.dumps(event)}\n\n"
            await asyncio.sleep(1)
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

### Interface Implementation

The dashboard should provide:

1. **Conversation View**: 
   - Thread-based view of prompts and responses
   - Document preview with syntax highlighting
   - Editing capabilities for human intervention

2. **System Status**:
   - Agent health indicators
   - Recent activity log
   - Resource utilization

3. **Control Panel**:
   - Ability to create new conversations
   - Adjustable agent parameters
   - Manual override options

## Integration Workflow

1. **Initialization Phase**:
   - External agent (e.g., GPT) calls Gateway to create a new conversation
   - Gateway assigns a session ID and creates the conversation directory

2. **Prompt Generation Phase**:
   - External agent sends a command to create a prompt document
   - GitHub Agent generates the document based on templates
   - Document is stored in the conversation directory

3. **Copilot Interaction Phase**:
   - VS Code extension or scheduled task detects new prompt documents
   - Documents are opened in VS Code for GitHub Copilot interaction
   - Human operator or automated system interacts with Copilot
   - Response is saved in the conversation directory

4. **Response Processing Phase**:
   - GitHub Agent detects new response documents
   - Content is parsed and processed according to rules
   - Results are made available through the API
   - Events are generated to notify interested parties

5. **Feedback Loop**:
   - External agent retrieves the processed response
   - Based on the response, it may generate follow-up prompts
   - The cycle continues until the task is complete

## Advantages of This Approach

1. **Transparent Workflow**: All interactions are documented and traceable
2. **Human-in-the-loop**: Easy for humans to intervene at any point
3. **Platform Independence**: Not tied to specific AI implementations
4. **Asynchronous Operation**: Agents can work at their own pace
5. **Scalability**: Can add more specialized agents over time

## Challenges and Considerations

1. **Document Versioning**: Need to handle concurrent edits and versioning
2. **Timeout Handling**: How to handle scenarios where responses are delayed
3. **Error Recovery**: Graceful degradation when components fail
4. **Security**: Careful consideration of permissions and access control
5. **Resource Management**: Efficient storage and retrieval of documents

## Next Steps for Prototype Development

1. Implement the enhanced document store structure
2. Develop templates for prompt and response documents
3. Extend the API Gateway with event notification capabilities
4. Create a basic web dashboard for monitoring and interaction
5. Implement the VS Code integration for GitHub Copilot interaction

This prototype should demonstrate the viability of a document-based workflow for AI agent orchestration, with particular emphasis on seamless integration between external AI systems and GitHub Copilot.

The ability to create additional agents and assign them into a particular role with unique responsibilities, knowledge, and skill sets based on knowledge documents, Interactive questioning to clarify or request more information, and self improvement through reflection. An interface to manage creation and editing of agents.
  