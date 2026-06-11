---
name: issue-branch
description: GitHub Issueを元に、Issue番号と英語の短い名前を含む作業ブランチを作成する。Issue着手時やIssue番号からブランチを作ることを明示された依頼で使用。
allowed-tools: Bash(git status *) Bash(git branch *) Bash(git switch *) Bash(git fetch *) Bash(git remote *) Bash(git symbolic-ref *) Bash(gh issue view *)
---

Issueに着手するためのローカルブランチを作成する。

1. Issue番号を取得する。指定がない場合は確認する。
2. `git status`で作業ツリーを確認し、未コミット変更がある場合はブランチ作成前に確認する。
3. 利用可能なら`gh issue view <番号>`でIssueのタイトル、状態、ラベルを確認する。
4. 英語の短いslugを決める。
   - ユーザー指定の英名を優先
   - 指定がない場合はIssueタイトルから英訳
   - 小文字の英数字とハイフンだけを使用
   - 3〜6語程度に収める
5. ブランチ名を`<Issue番号>-<slug>`形式にする。
   - 例: `123-add-login-page`
   - Issue番号やslugを省略しない
6. 同名のローカル・リモートブランチがないことを確認する。
7. デフォルトブランチを特定する。
   - `origin/HEAD`が利用できる場合は参照先を使用
   - 利用できない場合は`git remote show origin`で確認
   - 特定できない場合は推測で進めない
8. `git fetch origin <デフォルトブランチ>`で最新状態を取得する。取得できない場合は、
   ローカルのデフォルトブランチを基点にしてよいか確認する。
9. `git switch --no-track -c <ブランチ名> origin/<デフォルトブランチ>`で作成する。
10. 作成したブランチ名、基点、Issue URLまたはIssue番号を報告する。

ユーザーが明示しない限り、push、Issue更新、コミットは実行しない。
