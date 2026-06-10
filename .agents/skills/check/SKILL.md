---
name: check
description: リポジトリ標準のテスト、ビルド、差分チェックを実行。変更内容の検証時に使用。
disable-model-invocation: true
allowed-tools: Bash(npm run check)
---

`npm run check` を実行する。

各チェック結果を簡潔に報告する。現在の変更が原因で失敗した場合は修正し、再実行する。
コミットとpushは実行しない。
