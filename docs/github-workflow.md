# GitHub運用ガイド

## 基本方針

- 作業内容と完了条件はIssueで管理
- 作業ブランチとPull RequestはIssueへ紐付け
- 作業種類は`type:*`、対象領域は`area:*`ラベルで管理

## Issue

作業内容に合うIssue Formを選択し、対象領域を必ず指定する。

| ラベル | 用途 |
| --- | --- |
| `area:frontend` | 画面、UI、ブラウザ上の処理 |
| `area:backend` | API、DB、サーバー上の処理 |
| `area:common` | 開発環境、CI、ドキュメント、複数領域にまたがる変更 |

Issue Formのドロップダウン選択だけではGitHubラベルを動的に付与できないため、
Issue作成後に選択した`area:*`ラベルを付与する。`issue` Skillで作成する場合は、
選択領域に対応するラベルも指定する。

`type:*`ラベルは選択したIssue Formから自動付与する。

## ブランチ

Issueへ着手するときは、`issue-branch` Skillで作業ブランチを作成する。

```text
issue/<Issue番号>-<英語の短い名前>
```

例:

```text
issue/123-add-login-page
issue/124-fix-todo-validation
```

- Issue番号と英語slugを必ず含める
- slugは小文字の英数字とハイフンを使用
- 1ブランチでは原則1Issueを扱う

## Pull Request

Pull Request本文には、マージ時に対象Issueを閉じるキーワードだけを記載する。

```text
Closes #123
```

変更内容、完了条件、背景はIssueを情報源とする。Issueを閉じないPRでは
`Refs #123`を使用する。

## 参考資料

- [GitHub Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [Issueからブランチを作成](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-a-branch-for-an-issue)
- [Pull RequestをIssueへリンク](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
