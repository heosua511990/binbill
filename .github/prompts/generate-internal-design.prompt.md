---
description: 'Internal Design Document Generator for development features. Creates structured documentation following ZERO-X template format including background, architecture, diagrams, API/Batch details, and risk analysis.'
mode: 'agent'
---

# Internal Design Document Generator

## Configuration Variables
${FEATURE_NAME="Feature Name"} <!-- Name of the feature being developed -->
${TICKET_ID="ZERO-XXX"} <!-- Ticket ID (e.g., ZERO-111) -->
${OWNER_NAME="Developer Name"} <!-- Feature owner name -->
${OWNER_EMAIL="email@supremetech.vn"} <!-- Feature owner email -->
${REVIEWER_NAME="Reviewer Name"} <!-- Reviewer name -->
${REVIEWER_EMAIL="reviewer@supremetech.vn"} <!-- Reviewer email -->
${INCLUDES_DATA_STRUCTURE=true|false} <!-- Include data structure section -->
${INCLUDES_ARCHITECTURE_IMAGE=true|false} <!-- Include architecture image -->
${INCLUDES_SEQUENCE_DIAGRAM=true|false} <!-- Include sequence diagram -->
${DETAIL_LEVEL="High-level|Detailed|Comprehensive"} <!-- Level of detail to include -->

## Generated Prompt

"Create an Internal Design document following the ZERO-X Development template. Analyze the codebase and feature requirements to generate a comprehensive design document with the following structure:

# **[${TICKET_ID}] Development**

Owned by: [${OWNER_NAME}](mailto:${OWNER_EMAIL})  
Last updated: [${OWNER_NAME}](mailto:${OWNER_EMAIL})  
Reviewer: [${REVIEWER_NAME}](mailto:${REVIEWER_EMAIL})

### Document Structure and Content Guidelines

## 1. Background

Analyze the feature requirements and codebase to provide:

* **Purpose:** 
  - Clearly state the main objective of this feature/development
  - Why is this feature needed? What problem does it solve?
  - What business value does it provide?

* **Solution:** 
  - Provide a high-level overview of the proposed solution
  - Describe the approach to solve the problem
  - Mention key technologies or patterns to be used

* **Scope:**
  - Define what will be included in this development
  - Identify affected systems, components, or modules
  - Specify what is out of scope
  - List impacted features or functionalities

---

## 2. Data Structure

${INCLUDES_DATA_STRUCTURE ? 
"Analyze and document the data structures involved:

* **Database Schema Changes:**
  - New tables or collections
  - Modified tables or collections
  - Indexes to be added or modified
  - Data relationships and foreign keys

* **Data Models:**
  - Request/Response DTOs
  - Domain models or entities
  - View models
  - Data transfer objects

* **Data Flow:**
  - How data moves through the system
  - Data transformation points
  - Validation rules

Provide clear diagrams or descriptions of the data structures." : 
"(Document any data structure changes if applicable, otherwise mark as 'none')"}

---

## 3. Architecture Image

${INCLUDES_ARCHITECTURE_IMAGE ?
"Create or describe the architecture overview:

* **System Architecture:**
  - High-level component diagram
  - Show how new components fit into existing architecture
  - Indicate component boundaries and responsibilities
  - Show data flow between components

* **Technology Stack:**
  - Frontend technologies
  - Backend services
  - Database systems
  - External integrations

Use visual diagrams (Mermaid or PlantUML) or provide detailed textual descriptions." :
"(Provide architecture diagram if applicable, otherwise mark as 'none')"}

---

## 4. Diagram

${INCLUDES_SEQUENCE_DIAGRAM ?
"Create detailed sequence diagrams to illustrate the flow:

* **Sequence Diagram:**
  - User interactions and API calls
  - Service-to-service communication
  - Database operations
  - External system integrations
  - Error handling flows

Use Mermaid sequence diagram syntax or PlantUML format.

Example:
\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Service
    participant Database
    
    User->>Frontend: Action
    Frontend->>API: HTTP Request
    API->>Service: Process
    Service->>Database: Query
    Database-->>Service: Result
    Service-->>API: Response
    API-->>Frontend: Response
    Frontend-->>User: Display
\`\`\`" :
"- Sequence Diagram (Provide if applicable)"}

---

## 5. Detail

### **API/Batch**

Analyze the codebase to document API endpoints or batch processes:

* **API Endpoints:**
  - Endpoint URL and HTTP method
  - Request parameters and body structure
  - Response structure
  - Authentication/Authorization requirements
  - Error responses

* **Usage:**
  - When is this API/Batch used?
  - Which features or screens utilize it?
  - What business processes does it support?
  - Expected call frequency or triggers

* **Logic BE (Backend Logic):**
  - **Create/Update Operations:**
    - What entities are created or updated?
    - Business rules and validations
    - Data transformations
    - Transaction boundaries
  
  - **Processing Steps:**
    1. Input validation
    2. Business logic execution
    3. Data persistence
    4. Event triggering (if any)
    5. Response generation

  - **Integration Points:**
    - External API calls
    - Message queue operations
    - File operations
    - Cache operations

${DETAIL_LEVEL == "Comprehensive" || DETAIL_LEVEL == "Detailed" ?
"* **Code Examples:**
  - Key code snippets showing implementation
  - Important business logic
  - Complex algorithms or calculations
  - Integration patterns" : ""}

---

## 6. Risk/Concern

Analyze potential risks and concerns:

* **Concerns:**
  - Technical concerns (scalability, maintainability, performance)
  - Implementation challenges
  - Dependencies on other teams or systems
  - Timeline or resource constraints
  - Technical debt considerations

* **Risks:**
  - **Technical Risks:**
    - Performance bottlenecks
    - Data consistency issues
    - Security vulnerabilities
    - Compatibility problems
  
  - **Business Risks:**
    - User experience impact
    - Data migration risks
    - Downtime requirements
    - Rollback complexity
  
  - **Mitigation Strategies:**
    - How to mitigate each identified risk
    - Contingency plans
    - Monitoring and alerting
    - Testing strategies

---

## 7. Related Document

Provide links to related documentation:

* **Requirements:**
  - Link to feature specification
  - User stories or tickets
  - Design mockups or wireframes

* **Technical Documentation:**
  - API documentation
  - Database schema documentation
  - Related design documents

* **References:**
  - Similar implementations
  - Technical standards or guidelines
  - External API documentation

---

## Document Generation Instructions

When generating this document:

1. **Analyze the codebase** to understand existing patterns and architecture
2. **Identify relevant files** related to the feature being developed
3. **Extract actual code examples** when illustrating logic or patterns
4. **Provide realistic data structures** based on existing models
5. **Generate practical diagrams** that reflect the actual implementation
6. **Consider existing conventions** in the codebase
7. **Be specific** rather than generic in descriptions
8. **Include Vietnamese explanations** where appropriate for clarity
9. **Ensure consistency** with the existing system architecture
10. **Highlight integration points** with existing features

The generated document should be:
- **Practical** and ready to use for development
- **Detailed** enough for implementation
- **Clear** for both technical and non-technical stakeholders
- **Maintainable** and easy to update as the feature evolves

Save the generated document with the naming convention: **[${TICKET_ID}][Internal Design] ${FEATURE_NAME}.md**"
