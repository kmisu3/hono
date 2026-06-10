---
name: check
description: Run the repository's standard tests, build, and diff checks.
disable-model-invocation: true
allowed-tools: Bash(npm run check)
---

Run `npm run check`.

Report each check result clearly. If a check fails, investigate and fix failures
caused by the current changes, then run the command again. Do not commit or push.
