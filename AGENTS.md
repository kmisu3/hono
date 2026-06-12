# リポジトリガイドライン

## プロジェクト概要

- Node.js上で動作するHono・TypeScript製REST API。
- ローカル開発はDocker Composeを使用し、APIをポート`8787`で公開。
- APIルートとアプリケーションロジックは`src/app.ts`。
- Node.jsサーバーの起動処理は`src/index.ts`。

## 開発コマンド

- 起動: `docker compose up --build`
- テスト: `npm test`
- ビルド: `npm run build`
- Lint（Biome）: `npm run lint`（自動修正は`npm run lint:fix`）
- 一括チェック: `npm run check`
- 手動コミット前チェック: `npm run commit:check`
- DB: 生成`npm run db:generate` / 適用`npm run db:migrate` / 投入`npm run db:seed`
- よく使う操作はMakefileに集約（`make help`で一覧）

## 開発ルール

- 変更は依頼されたタスクの範囲内に限定。
- 動作を変更する場合はテストを追加・更新。
- 業務ルールや純粋関数を追加・変更する場合は単体テストを追加・更新。
- 外部入力はZodで検証。環境変数は`src/shared/env.ts`で検証。
- コードはBiomeのlint・整形に従う（`npm run lint`がCIでも実行される）。
- ルートハンドラーとJSONレスポンスは簡潔で一貫した形を維持。
- APIの構成・責務分離は`docs/architecture.md`に従う。
- DBの実装・マイグレーション・テストは`docs/database.md`に従う。
- APIの追加・変更時は`openapi/openapi.yaml`も更新し、`docs/openapi.md`に従う。
- Issue・ブランチ・Pull Requestの運用は`docs/github-workflow.md`に従う。
- 秘密情報、`.env`、生成された`dist/`、`node_modules/`はコミット対象外。
- 実装・修正・設定変更を任された場合、AIは作業の節目で適切にコミットする。
- 調査、レビュー、説明、下書き作成だけの依頼では、明示されない限りコミットしない。
- 明示的な依頼がない限り、pushとPull Request作成は実行対象外。

## コミット方針

- 独立してレビュー・検証・取り消しできる作業単位が完成した時点でコミットする。
- 実装と、その動作を保証するテスト・OpenAPI・必要なドキュメントは同じコミットに含める。
- 目的が異なる変更、無関係なリファクタリング、後続作業の準備は別コミットに分ける。
- 数行ごとの細かすぎるコミットや、未完成・チェック失敗状態のWIPコミットは作成しない。
- 大きなタスクでは、基盤整備、機能実装、移行など、意味のある完了単位ごとにコミットする。
- ユーザーの未コミット変更を含めず、現在の作業に関係するファイルだけをステージする。
- コミット前に対象単位に必要なチェックを実行し、最終コミット前は`npm run commit:check`を実行する。
- コミット後も依頼範囲の作業が残っている場合は、そのまま実装を継続する。

## コミット手順

1. `git status`と全差分を確認。
2. 差分を独立した作業単位に分け、今回コミットする範囲を決める。
3. 対象単位に必要なテスト・チェックを実行。最終コミット前は`npm run commit:check`を実行。
4. 対象タスクに関係するファイルだけをステージ。
5. `git diff --cached`でステージ済み差分を確認。
6. Conventional Commits形式の日本語メッセージでコミット。
7. 自動pushは禁止。

## コミットメッセージ

- 形式: `<type>: <日本語の要約>`
- スコープが有用な場合: `<type>(<scope>): <日本語の要約>`
- 要約は変更内容が分かる簡潔な日本語。
- typeは変更ファイルの種類ではなく、コミットの目的に合わせる。
- 1コミットに複数種類の変更がある場合は、利用者から見た主目的に合うtypeを使用。
- `更新`、`修正`、`対応`だけの曖昧な要約を避け、何が変わるかを具体的に書く。

| type | 用途 |
| --- | --- |
| `feat` | 新機能・機能改善 |
| `fix` | 不具合修正 |
| `docs` | ドキュメントのみの変更 |
| `refactor` | 動作を変えないコード改善 |
| `test` | テストの追加・修正 |
| `chore` | 設定、依存関係、その他の保守 |
| `build` | ビルドシステム・外部依存の変更 |
| `ci` | CI設定の変更 |
| `perf` | パフォーマンス改善 |
| `revert` | 変更の取り消し |

例:

- `feat: Todo作成APIを追加`
- `fix(validation): 空のタイトルを拒否`
- `docs: ローカル起動手順を更新`
- `chore: AIツールの共通設定を整備`

## Agent Skills

- 共通Skillsの実体: `.agents/skills`
- Claude Code: `.claude/skills`から共通Skillsを参照
- Cursor: `.cursor/skills`から共通Skillsを参照
- Codex: `.codex/skills`から共通Skillsを参照
- `/check`: 標準チェックの実行
- `/commit [コミット内容]`: Conventional Commits形式の日本語メッセージでコミット。pushは実行対象外
- `/labels`: `.github/labels.json`に基づくGitHubラベルの作成・更新
- `openapi`: API実装とOpenAPI仕様書の同期・検証
- `issue`: Issue Formに沿ったIssueの下書き・作成
- `issue-branch`: Issue番号を含む英語名の作業ブランチ作成
- `pr`: Pull Requestテンプレートに沿ったPRの下書き・作成
- `guideline-review`: リポジトリ固有ガイドラインへの準拠レビュー
- `security-review`: OWASP API Top 10・ASVS観点のセキュリティレビュー
