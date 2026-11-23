# Tutor demo

Reusable Frontear chat/knowledge-graph integration. No music-specific business rules are embedded in this frontend.

## Run locally

1. In `Garyu-tt/musicaiman`: `python -m venv .venv && . .venv/bin/activate && pip install -r requirements-dev.txt && uvicorn app:app --reload`.
2. In `Garyu-tt/Frontear/experiments/tutor`: `python -m http.server 5173`.
3. Open `http://localhost:5173` and ask a question. Backend default CORS allows this origin.

Backend URL is editable in the interface. Use HTTPS for deployed sites and configure CORS_ORIGINS on the backend accordingly. Never expose a local LLM's unauthenticated endpoint directly to the public internet; keep inference behind quota/rate-limited API.

The graph panel currently displays a clickable topic list; spatial graph visualization is future work. The chat demo is not yet deployed or browser-tested.
