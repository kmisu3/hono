# AI開発ツール運用ガイド

## 採用方針

繰り返し利用する開発手順は、Agent Skills標準の`SKILL.md`で管理する。
Claude CodeのカスタムCommandsはSkillsへ統合されており、Skillsは手動実行と
自動適用の両方に対応する。Codexもリポジトリの`.agents/skills`とシンボリックリンクを
サポートするため、ツール別のCommandsは重複して作成しない。

共通Skillsの実体は`.agents/skills`へ配置し、各ツールから参照する。

```text
.agents/skills/     # 共通Skillsの実体
.claude/skills  -> ../.agents/skills
.cursor/skills  -> ../.agents/skills
.codex/skills   -> ../.agents/skills
```

## Skills一覧

| Skill | 自動適用 | 用途 |
| --- | --- | --- |
| `check` | 明示時 | lint・テスト・ビルド・差分チェック |
| `commit` | 明示時 | 対象差分を日本語メッセージでコミット |
| `openapi` | あり | API実装とOpenAPI仕様書の同期・検証 |
| `issue` | あり | Issue Formに沿ったIssueの下書き・作成 |
| `issue-branch` | 明示時 | Issue番号を含む英語名の作業ブランチ作成 |
| `pr` | あり | PRテンプレートに沿ったPRの下書き・作成 |
| `guideline-review` | あり | リポジトリ固有ガイドラインへの準拠レビュー |
| `security-review` | あり | OWASP API Top 10・ASVS観点のレビュー |

`check`、`commit`、`issue-branch`は、ユーザーが実行を明示した場合だけ使用する。
`issue`と`pr`は作業中の自動参照を許可するが、GitHubへの作成はユーザーが明示した
場合だけ実行する。

## 呼び出し方

- Claude Code: `/openapi`、`/issue`、`/issue-branch 123 add-login-page`、`/pr`
- Codex: `$openapi`、`$issue`、`$issue-branch`、`$pr`、または自然言語でSkill名を指定
- Cursor: 自然言語でSkill名または作業内容を指定

例:

```text
$openapi Todoの期限を追加して仕様書とモックも更新
$issue OpenAPIの契約テスト導入を設計タスクとして下書き
$issue-branch 123 add-login-page
$pr 現在の差分からPR本文を作成
$guideline-review 現在の変更をレビュー
$security-review 現在のAPI変更をレビュー
```

## 作成・更新ルール

- 複数手順、判断基準、リポジトリ固有知識を含む作業はSkillにする
- 単純なシェル操作は`package.json`または`Makefile`へ置く
- 同じ内容をツール別Commandsへ重複させない
- `SKILL.md`は手順に集中し、既存テンプレートやガイドを直接参照する
- Skill追加後はAgent Skillsのバリデーターで確認する
- GitHub作成、コミット、pushなどの副作用は明示的な依頼を必要とする

## 参考資料

- [Agent Skills](https://agentskills.io/)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
- [Codex Agent Skills](https://developers.openai.com/codex/skills)
- [GitHub Issue・Pull Requestテンプレート](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [OWASP ASVS 5.0.0](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
