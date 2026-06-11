# OpenAPI運用ガイド

## 構成

- 仕様書: `openapi/openapi.yaml`
- 仕様書UI: Swagger UI
- モックサーバー: Prism

Swagger UIとPrismはDocker Composeで起動するため、エディターの拡張機能は不要。
各サービスのポートはローカルホストだけに公開する。

## 起動

API、MySQL、Swagger UI、Prismをまとめて起動:

```sh
docker compose up --build
```

| 用途 | URL |
| --- | --- |
| API | `http://localhost:8787` |
| OpenAPI仕様書 | `http://localhost:8080` |
| PrismモックAPI | `http://localhost:4010` |

Prismは仕様書に記載したexamplesをレスポンスとして返す。
公式Prismイメージはamd64のため、Apple Siliconではエミュレーションで起動し、
初回起動に少し時間がかかる場合がある。

```sh
curl http://localhost:4010/health
curl http://localhost:4010/api/todos
curl -X POST http://localhost:4010/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"モックAPIを確認する"}'
```

## ポート変更

`.env`またはコマンド実行時の環境変数で変更する。

```sh
OPENAPI_PORT=8081 MOCK_PORT=4011 docker compose up --build
```

## 更新ルール

- APIの追加・変更時は、同じPull Requestで仕様書も更新
- `summary`は利用者から見た操作を簡潔に記載
- `operationId`は重複しない英語の動詞から開始
- リクエスト、成功レスポンス、主要なエラーを記載
- サンプルとして利用できるexamplesを記載
- 共通の型、パラメーター、レスポンスは`components`へ配置
- Swagger UIで表示を確認し、Prismでリクエストとレスポンスを確認

OpenAPI仕様書を正本として扱う場合でも、Honoの実装と自動的には同期されない。
仕様書と実装の差異を検出する仕組みが必要になった時点で、契約テストや
OpenAPI対応のHonoルーター導入を検討する。

## 参考資料

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Prism](https://github.com/stoplightio/prism)
