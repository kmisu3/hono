# Hono API

Hono と TypeScript を使用したREST API開発用リポジトリです。
Dockerを利用して、ローカル環境ですぐに開発を始められます。

現在はTodo APIを提供しており、データはメモリ上に保存します。コンテナを再起動すると
データは初期状態に戻るため、永続化が必要な場合はデータベースを追加してください。

## 必要なもの

- Docker Desktop または Docker Engine + Docker Compose

## 起動

```sh
docker compose up --build
```

別のターミナルで動作確認します。

```sh
curl http://localhost:8787/health
curl http://localhost:8787/api/todos
```

コードを変更すると、コンテナ内の開発サーバーが自動で再起動します。終了するには
`Ctrl+C` を押し、コンテナを削除する場合は次を実行します。

```sh
docker compose down
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

## ファイル構成

```text
.
├── src/
│   ├── app.ts       # Hono アプリと API ルート
│   ├── app.test.ts  # API テスト
│   └── index.ts     # Node.js サーバーの起動処理
├── compose.yaml
├── Dockerfile
├── package.json
└── tsconfig.json
```

## 今後の開発候補

1. `src/app.ts` に新しいルートを追加する
2. Zod のスキーマを変更し、入力検証を追加する
3. `src/app.test.ts` にテストケースを追加する
4. SQLite や PostgreSQL を追加し、Todo を永続化する

## GitHub での開発管理

Issue 作成時は、実装・バグ・設計・保守・非コード作業に対応した Issue Form を
選択できます。Pull Request には、関連 Issue、検証内容、影響とリスクを確認する
テンプレートが適用されます。

GitHub Projects の推奨フィールド、ビュー、ワークフロー、トリアージ手順は
[`.github/PROJECTS.md`](.github/PROJECTS.md) を参照してください。
