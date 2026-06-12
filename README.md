# Hono API

Hono と TypeScript を使用したREST API開発用リポジトリです。
Dockerを利用して、ローカル環境ですぐに開発を始められます。

現在はTodo APIを提供しており、データはMySQLへ保存します。通常のテストでは、
MySQLを起動せずインメモリSQLiteを使用します。

## 必要なもの

- Docker Desktop または Docker Engine + Docker Compose

## 起動

```sh
docker compose up --build
```

よく使う操作は Makefile にまとめています。一覧は `make help` で確認できます。

```sh
make up        # 起動（ビルド込み）
make migrate   # マイグレーション適用
make seed      # サンプルデータ投入
make reset     # DBごと初期化して再起動
make docs      # OpenAPI仕様書UIとモックサーバーを起動
make check     # lint・test・build
```

別のターミナルで動作確認します。

```sh
curl http://localhost:8787/health
curl http://localhost:8787/api/todos
```

OpenAPI仕様書とモックAPI:

| 用途 | URL |
| --- | --- |
| OpenAPI仕様書 | `http://localhost:8080` |
| PrismモックAPI | `http://localhost:4010` |

Swagger UIとPrismもDockerで起動するため、エディターの拡張機能は不要です。
API、MySQL、Swagger UI、Prismのポートはローカルホストだけに公開します。

コードを変更すると、コンテナ内の開発サーバーが自動で再起動します。終了するには
`Ctrl+C` を押し、コンテナを削除する場合は次を実行します。

```sh
docker compose down
```

MySQLのデータも削除する場合:

```sh
docker compose down -v
```

## API の動作確認

Todo を作成:

```sh
curl -i -X POST http://localhost:8787/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hono APIを開発する"}'
```

Todo を更新:

```sh
curl -i -X PATCH http://localhost:8787/api/todos/1 \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'
```

Todo を削除:

```sh
curl -i -X DELETE http://localhost:8787/api/todos/1
```

`8787` が使用中の場合は、`API_PORT=8888 docker compose up --build` のように
ホスト側の公開ポートを変更できます。

## テスト

起動中のコンテナで実行:

```sh
docker compose exec api npm test
```

ローカルの Node.js を使う場合:

```sh
npm install
npm run dev
npm test
```

Lint（Biome）、テスト、TypeScriptビルド、差分チェックをまとめて実行:

```sh
npm run check
```

Lintと自動整形を個別に実行:

```sh
npm run lint        # 静的解析
npm run lint:fix    # 静的解析 + 自動修正
npm run format      # 整形のみ
```

手動コミット前の確認:

```sh
npm run commit:check
git add <対象ファイル>
git diff --cached
git commit -m "feat: Todo作成APIを追加"
```

## AI開発ツール

Claude Code、Cursor、Codex向けに、共通の開発手順とコマンドを用意しています。

- 共通ルール: `AGENTS.md`
- 共通Agent Skills: `.agents/skills`
- Claude Code: `CLAUDE.md`、`.claude/skills`
- Cursor: `.cursor/skills`
- Codex: `.codex/skills`
- 共通Skills: `check`、`commit`、`openapi`、`issue`、`issue-branch`、`pr`、
  `guideline-review`、`security-review`

各ツール固有のSkillsディレクトリは、`.agents/skills`へのシンボリックリンクです。
SkillsはAgent Skills標準の`SKILL.md`形式で管理します。Claude Codeでは
`/openapi`のように直接実行でき、Codexでは`$openapi`のように指定できます。
`commit`、`openapi`、`issue`、`pr`は、自然言語の依頼内容に応じた自動適用にも対応します。

| Skill | 用途 |
| --- | --- |
| `check` | lint・テスト・ビルド・差分チェック |
| `commit` | 日本語のConventional Commits形式でコミット |
| `openapi` | API実装とOpenAPI仕様書の同期・Swagger UI・Prism検証 |
| `issue` | Issue Formに沿ったIssueの下書き・作成 |
| `issue-branch` | Issue番号を含む英語名の作業ブランチ作成 |
| `pr` | Pull Requestテンプレートに沿ったPRの下書き・作成 |
| `guideline-review` | 設計・DB・OpenAPI・テスト方針への準拠レビュー |
| `security-review` | OWASP API Top 10・ASVS観点のセキュリティレビュー |

実装・修正を任された場合、AIは独立してレビュー・検証できる作業単位の完成時に
適切な日本語メッセージでコミットします。GitHubへのIssue・PR作成、ラベル同期、
pushなどの副作用を伴う操作は、明示的に依頼された場合だけ実行します。
SkillsとCommandsの使い分けや呼び出し方は
[`docs/ai-tools.md`](docs/ai-tools.md)を参照してください。

## ファイル構成

```text
.
├── src/
│   ├── app.ts       # Hono アプリと API ルート
│   ├── app.test.ts  # API テスト
│   ├── db/           # MySQL実装とSQLiteテスト環境
│   ├── features/    # 機能単位の処理と単体テスト
│   ├── shared/       # 環境変数検証など共通処理
│   └── index.ts     # Node.js サーバーの起動処理
├── drizzle/          # MySQLマイグレーション
├── openapi/          # OpenAPI仕様書
├── .github/workflows # CI（lint・test・build）
├── biome.json        # Lint・整形設定
├── compose.yaml
├── Dockerfile
├── Makefile          # よく使う開発コマンド
├── package.json
└── tsconfig.json
```

## 今後の開発候補

1. `src/app.ts` に新しいルートを追加する
2. Zod のスキーマを変更し、入力検証を追加する
3. `src/app.test.ts` にテストケースを追加する
4. Todo以外の機能をRepository境界を保ちながら追加する

## GitHub での開発管理

Issue作成時は、作業種類に合うIssue Formと、フロントエンド・バックエンド・共通の
対象領域を選択します。作業ブランチとPull RequestはIssueへ紐付けます。
詳細は[`docs/github-workflow.md`](docs/github-workflow.md)を参照してください。

## 設計ガイド

小〜中規模のHono API向け設計方針は
[`docs/architecture.md`](docs/architecture.md)を参照してください。

MySQL、Drizzle ORM、SQLiteテストの運用方針は
[`docs/database.md`](docs/database.md)を参照してください。

OpenAPI仕様書、Swagger UI、Prismの運用方針は
[`docs/openapi.md`](docs/openapi.md)を参照してください。
