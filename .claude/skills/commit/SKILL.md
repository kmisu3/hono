---
name: commit
description: Review, validate, stage, and commit the current task without pushing.
argument-hint: "[commit message]"
disable-model-invocation: true
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git add *) Bash(git commit *) Bash(npm run commit:check)
---

Prepare and create one focused commit for the current task.

1. Read `AGENTS.md`.
2. Inspect `git status`, the unstaged diff, and the staged diff.
3. Confirm all changed files belong to the current task. Never include unrelated changes.
4. Run `npm run commit:check`. Resolve failures caused by the current changes.
5. Stage only the intended files.
6. Review `git diff --cached` before committing.
7. Use `$ARGUMENTS` as the commit message when provided. Otherwise create a concise imperative commit message from the staged diff.
8. Create the commit.
9. Report the commit hash, message, included files, and check results.

Do not amend an existing commit. Do not push or create a pull request.
