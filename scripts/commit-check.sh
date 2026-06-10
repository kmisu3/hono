#!/bin/sh

set -eu

echo "==> Running project checks"
npm run check

echo
echo "==> Working tree"
git status --short

echo
echo "==> Diff summary"
git diff --stat
git diff --cached --stat

echo
echo "Commit checks passed."
