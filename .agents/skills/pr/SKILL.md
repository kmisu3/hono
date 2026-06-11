---
name: pr
description: リポジトリのPull Requestテンプレートに沿ってPR本文の下書きまたはPull Requestを作成する。変更内容のPR化、PR本文作成、レビュー依頼の準備で使用。
---

Issueへ紐付くPull Requestを準備する。

1. `AGENTS.md`、`docs/github-workflow.md`、`.github/PULL_REQUEST_TEMPLATE.md`を確認する。
2. `git status`、現在ブランチ、コミット履歴、対象ブランチとの差分を確認する。
3. `issue/<番号>-<slug>`形式のブランチ名またはユーザー指定からIssue番号を特定する。
4. Issue番号を特定できない場合は確認し、捏造しない。
5. PR本文はIssueとの関係だけを記載する。
   - マージ時に閉じる: `Closes #<番号>`
   - 関連付けのみ: `Refs #<番号>`
6. PRタイトルはコミットとIssueの内容から簡潔な日本語で作成する。

ユーザーがPR作成を明示した場合だけ、次を実行する。

1. デフォルトブランチ上ではないことを確認する。
2. 必要なコミットとpushが完了していることを確認する。
3. 利用可能なGitHub連携または`gh pr create`でPRを作成する。

作成を明示していない場合は、PRタイトルとIssueリンク本文の下書きを提示する。
作成後はPR URL、対象ブランチ、関連Issueを報告する。
