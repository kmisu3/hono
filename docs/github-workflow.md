# GitHub運用ガイド

## 基本方針

- 作業内容と完了条件はIssueで管理
- 作業ブランチとPull RequestはIssueへ紐付け
- 作業内容は`作業:*`、変更対象は`対象:*`ラベルで管理

## Issue

作業内容に合うIssue Formを選択する。変更対象はIssue本文に重複して記載せず、
`対象:*`ラベルだけで管理する。

| ラベル | 用途 |
| --- | --- |
| `対象:フロントエンド` | 画面、UI、ブラウザ上の処理 |
| `対象:バックエンド` | API、DB、サーバー上の処理 |
| `対象:共通` | 開発環境、CI、ドキュメント、複数対象にまたがる変更 |

Issue作成後に変更内容に合う`対象:*`ラベルを付与する。`issue` Skillで作成する場合は、
依頼内容から変更対象を判断してラベルを指定する。

`作業:*`ラベルは選択したIssue Formから自動付与する。

ラベルの名前、色、説明は`.github/labels.json`で管理する。新規リポジトリへ導入する場合や
定義を変更した場合は、`labels` Skillまたは次のコマンドで作成・更新する。

```text
npm run labels:sync -- --dry-run
npm run labels:sync
```

別リポジトリへ同期する場合だけ対象を指定する。

```text
npm run labels:sync -- --repo <owner/repo> --dry-run
npm run labels:sync -- --repo <owner/repo>
```

同期処理は定義済みラベルを作成・更新し、定義にない既存ラベルは削除しない。

## ブランチ

Issueへ着手するときは、`issue-branch` Skillで作業ブランチを作成する。

```text
<Issue番号>-<英語の短い名前>
```

例:

```text
123-add-login-page
124-fix-todo-validation
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
