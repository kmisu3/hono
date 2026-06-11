---
name: labels
description: リポジトリ共通のGitHubラベルを対象リポジトリへ作成・更新する。新規リポジトリの初期設定、Issue Form導入、ラベル同期を依頼された場合に使用。
allowed-tools: Bash(npm run labels:sync *) Bash(gh repo view *) Bash(gh label list *)
---

`.github/labels.json`を定義元として、GitHubラベルを対象リポジトリへ同期する。

1. `.github/labels.json`と`.github/ISSUE_TEMPLATE/*.yml`を確認し、必要なラベルが定義されていることを確認する。
2. 対象リポジトリを特定する。指定がなければ`gh repo view --json nameWithOwner`で現在のリポジトリを確認する。
3. `npm run labels:sync -- --repo <owner/repo> --dry-run`で同期内容を確認する。
4. ラベル作成・更新はGitHubへの変更を伴うため、ユーザーが同期を明示した場合だけ`npm run labels:sync -- --repo <owner/repo>`を実行する。
5. `gh label list --repo <owner/repo>`で名前、色、説明が反映されたことを確認する。

同期処理は定義済みラベルの作成・更新だけを行う。定義にない既存ラベルは削除しない。
