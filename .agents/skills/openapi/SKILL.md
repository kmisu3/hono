---
name: openapi
description: Hono APIの追加・変更に合わせてOpenAPI仕様書を作成・更新し、Swagger UIとPrismで検証する。API設計、エンドポイント変更、リクエスト・レスポンス変更、OpenAPI仕様書、モックAPIに関する作業で使用。
---

Honoの実装と`openapi/openapi.yaml`を同期する。

1. `AGENTS.md`、`docs/openapi.md`、`openapi/openapi.yaml`を確認する。
2. 対象ルート、Zodスキーマ、レスポンス、テストを確認する。
3. 次の内容を仕様書へ反映する。
   - パス、HTTPメソッド、パラメーター
   - リクエストBody
   - 成功レスポンスと主要なエラー
   - 利用可能なexamples
4. 共通定義は`components`へ配置し、既存定義を再利用する。
5. 実装に存在しない仕様や、仕様に存在しない公開APIがないか確認する。
6. `docker compose config --quiet`でCompose設定を確認する。
7. `docker compose up -d openapi mock`でSwagger UIとPrismを起動する。
8. Swagger UIが仕様書を配信できることと、Prismが主要な正常系・異常系を返すことを確認する。
9. API実装も変更した場合は`npm run check`を実行する。

仕様書だけを変更する依頼では、API実装を推測で変更しない。
仕様書と実装の差異、未確認事項、実行した検証を報告する。
