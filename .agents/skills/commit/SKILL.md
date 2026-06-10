---
name: commit
description: 現在の変更を確認・検証し、対象ファイルのみを日本語メッセージでコミット。手動コミット時に使用。
argument-hint: "[コミット内容]"
disable-model-invocation: true
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git add *) Bash(git commit *) Bash(npm run commit:check)
---

現在のタスクに関係する変更を、1つのコミットとして作成する。

1. `AGENTS.md`を確認する。
2. `git status`、未ステージ差分、ステージ済み差分を確認する。
3. 現在のタスクに関係するファイルだけが含まれることを確認する。
4. `npm run commit:check`を実行し、現在の変更が原因の失敗を解消する。
5. 対象ファイルだけをステージする。
6. `git diff --cached`でコミット内容を再確認する。
7. 引数がある場合は内容を踏まえ、簡潔な日本語のコミットメッセージへ整える。引数がない場合はステージ済み差分から日本語メッセージを作成する。
8. コミットを作成する。
9. コミットハッシュ、メッセージ、対象ファイル、チェック結果を報告する。

既存コミットのamend、push、Pull Request作成は実行しない。
