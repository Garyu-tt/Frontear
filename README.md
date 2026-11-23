# Frontear

Shared frontend platform for multiple projects. Frontend-only: backend services live in separate repositories.

## Architecture
- Reusable application shell, navigation, chat, graph viewer, resource cards and design tokens.
- Project-specific integrations consume versioned OpenAPI endpoints; no music-domain logic in the shared UI core.
- First integration: **Musicaiman**, an anonymous music tutor with a concept dependency graph and video resources.
- Keep API URL configurable. No login required for the public tutor.
- Frontend can preserve optional practice progress in browser storage.

## First integration contract
- GET /api/v1/graph: concepts, prerequisites, video references and edges.
- GET /api/v1/concepts/{id}: concept with related videos.
- POST /api/v1/chat: question and limited history; returns answer, matched concepts and videos.

See issue #1 for implementation milestones. Backend implementation is maintained separately.
