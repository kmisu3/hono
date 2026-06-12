# API契約をOpenAPIで管理する

- 状態: 採用
- 決定日: 2026-06-12

## 背景

API利用者と実装者が同じリクエスト・レスポンス仕様を確認でき、実装前後にモックで
動作確認できる環境が必要である。

## 決定

公開APIの契約を`openapi/openapi.yaml`で管理し、Swagger UIで閲覧、PrismでモックAPIを
提供する。API変更時は実装、テスト、OpenAPI仕様書を同じ作業で更新する。

## 選択肢

- OpenAPI + Swagger UI + Prism: 人間とツールの両方が利用でき、モックも提供できるため採用。
- READMEだけでAPI仕様を管理: 機械検証やモック生成に利用できないため不採用。
- 実装だけを正とする: 利用者がソースコードを読まずに契約を確認できないため不採用。

## 影響

- 実装とOpenAPI仕様書の同期をレビューで確認する必要がある。
- OpenAPI仕様書からSwagger UIとPrismを利用できる。
- 契約差異の自動検出が必要になった場合は契約テストを追加する。

## 関連資料

- [`docs/openapi.md`](../openapi.md)
- [`openapi/openapi.yaml`](../../openapi/openapi.yaml)
