---
name: commit
description: 現在の変更を確認・検証し、対象ファイルのみをConventional Commits形式の日本語メッセージでコミットする。ユーザーがコミットを明示した場合に使用。
allowed-tools: Bash(git status *) Bash(git diff *) Bash(git add *) Bash(git commit *) Bash(npm run commit:check)
---

現在のタスクに関係する変更を、1つのコミットとして作成する。

1. `AGENTS.md`を確認する。
2. `git status`、未ステージ差分、ステージ済み差分を確認する。
3. 現在のタスクに関係するファイルだけが含まれることを確認する。
4. `npm run commit:check`を実行し、現在の変更が原因の失敗を解消する。
5. 対象ファイルだけをステージする。
6. `git diff --cached`でコミット内容を再確認する。
7. `AGENTS.md`のコミットメッセージ規約に従い、`<type>: <日本語の要約>`形式のメッセージを作成する。スコープが有用な場合は`<type>(<scope>): <日本語の要約>`形式を使用する。
8. 引数がある場合は内容を踏まえてtypeと日本語の要約を整える。引数がない場合はステージ済み差分から作成する。
9. コミットを作成する。
10. コミットハッシュ、メッセージ、対象ファイル、チェック結果を報告する。

既存コミットのamend、push、Pull Request作成は実行しない。
