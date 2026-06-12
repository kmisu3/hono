---
name: guideline-review
description: 変更内容がリポジトリの開発・設計・DB・OpenAPI・テストのガイドラインに沿っているかレビューする。実装後のセルフレビュー、Pull Request前の確認、設計準拠確認で使用。
---

現在の変更または指定された対象を、リポジトリ固有のガイドラインに照らしてレビューする。

1. `AGENTS.md`を確認する。
2. 変更内容に応じて、次のガイドと設定を確認する。
   - API設計・責務分離・テスト: `docs/architecture.md`
   - DB・Repository・マイグレーション・テーブル定義書: `docs/database.md`、`docs/table-definitions`
   - API契約・モック: `docs/openapi.md`、`openapi/openapi.yaml`
   - AI開発ツール: `docs/ai-tools.md`
   - 自動チェック: `package.json`、`biome.json`、`.github/workflows/ci.yml`
3. `git status`と対象差分を確認する。コミット済み変更を指定された場合は対象ブランチとの差分を確認する。
4. 次の観点を優先する。
   - 責務と依存方向
   - 入力検証、レスポンス、エラー処理の一貫性
   - Repository境界とDB変更手順
   - MySQLスキーマとテーブル定義書の同期
   - OpenAPI仕様書と公開APIの同期
   - 変更リスクに見合うテスト
   - 無関係な変更、秘密情報、生成物の混入
5. 実行可能な標準チェックが未実行なら`npm run check`を実行する。

出力は問題を重要度順に先に示し、各指摘に根拠となるファイルと行を付ける。
問題がない場合は明記し、未確認事項や残るリスクだけを示す。
スタイル上の好みをガイドライン違反として扱わない。
