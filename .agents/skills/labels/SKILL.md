---
name: labels
description: リポジトリ共通のGitHubラベルを対象リポジトリへ作成・更新する。新規リポジトリの初期設定、Issue Form導入、ラベル同期を依頼された場合に使用。
allowed-tools: Bash(npm run labels:sync *) Bash(gh repo view *) Bash(gh label list *)
---

`.github/labels.json`を定義元として、GitHubラベルを対象リポジトリへ同期する。

1. `.github/labels.json`と`.github/ISSUE_TEMPLATE/*.yml`を確認し、必要なラベルが定義されていることを確認する。
2. 対象リポジトリを特定する。
   - 指定がない場合: `gh repo view --json nameWithOwner`で現在のリポジトリを確認し、`--repo`は指定しない。
   - 別リポジトリが指定された場合: `--repo <owner/repo>`を使用する。
3. 現在のリポジトリでは`npm run labels:sync -- --dry-run`、別リポジトリでは`npm run labels:sync -- --repo <owner/repo> --dry-run`で同期内容を確認する。
4. ラベル作成・更新はGitHubへの変更を伴うため、ユーザーが同期を明示した場合だけdry-runから`--dry-run`を外して実行する。
5. 現在のリポジトリでは`gh label list`、別リポジトリでは`gh label list --repo <owner/repo>`で名前、色、説明が反映されたことを確認する。

同期処理は定義済みラベルの作成・更新だけを行う。定義にない既存ラベルは削除しない。
