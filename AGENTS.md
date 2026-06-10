# Repository Guidelines

## Project overview

- Hono and TypeScript REST API running on Node.js.
- Local development uses Docker Compose and exposes the API on port `8787`.
- API routes and application logic live in `src/app.ts`.
- `src/index.ts` starts the Node.js server.

## Development commands

- Start: `docker compose up --build`
- Test: `npm test`
- Build: `npm run build`
- Full check: `npm run check`
- Before a manual commit: `npm run commit:check`

## Working conventions

- Keep changes focused on the requested task.
- Add or update tests when behavior changes.
- Validate external input with Zod.
- Keep route handlers and JSON responses simple and consistent.
- Do not commit secrets, `.env`, generated `dist/`, or `node_modules/`.
- Do not push or create a pull request unless explicitly requested.

## Commit workflow

1. Review `git status` and the complete diff.
2. Run `npm run commit:check`.
3. Stage only files related to the intended change.
4. Review the staged diff with `git diff --cached`.
5. Create one focused commit with a concise imperative message.
6. Do not push automatically.
