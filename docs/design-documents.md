# AI駆動開発の設計資料ガイド

## 目的

AIと人間が、実装内容だけでなく「何を作るか」「なぜこの設計か」「何を守るか」を
共有できる状態を維持する。コードから分かる内容を長文で複製せず、判断と契約を中心に残す。

## 設計情報の役割

| 情報 | 管理場所 | 役割 |
| --- | --- | --- |
| 常時守る開発ルール | `AGENTS.md` | コマンド、規約、禁止事項、作業手順 |
| システム共通の設計方針 | `docs/architecture.md`など | 責務、依存方向、API・DB・テスト方針 |
| API契約 | `openapi/openapi.yaml` | リクエスト・レスポンスの機械可読な仕様 |
| DB契約 | `src/db/mysql/schema.ts`、`docs/table-definitions` | 実装上のスキーマと人間向け説明 |
| 技術判断 | `docs/decisions` | 採用理由、選択肢、影響を残すADR |
| 機能固有の設計 | `docs/designs` | 複数要素にまたがる機能の範囲と実装方針 |
| 要件・完了条件 | GitHub Issue | 今回の作業で実現する内容 |
| 実装の保証 | テスト・CI | 仕様どおり動くことの継続確認 |

## 機能設計書

`docs/designs/_template.md`を使用する。次のいずれかに該当する場合に作成・更新する。

- 複数のAPI、テーブル、機能へ影響する
- 認証・認可、外部サービス連携、非同期処理を含む
- データ移行、後方互換性、段階的リリースの検討が必要
- 複数段階の処理フローや状態遷移を持つ
- 性能、可用性、セキュリティなど非機能要件が設計へ影響する

既存パターンに沿った小さなCRUD、不具合修正、文言変更では原則作成しない。

## ADR

ADRは、複数機能や今後の実装へ継続的に影響する技術判断を1件ずつ記録する。
`docs/decisions/_template.md`を使用し、既存ADRの内容を変更する場合は上書きせず、
新しいADRで置換関係を記録する。

次の場合に作成する。

- フレームワーク、DB、主要ライブラリ、外部サービスを採用・変更する
- アーキテクチャ、責務分離、データ管理、API契約の共通方針を決める
- 複数案に明確なトレードオフがあり、判断理由を将来も参照する必要がある
- 既存のADRを廃止・置換する

機能固有の小さな実装判断は、必要に応じて機能設計書へ記載する。

## 更新ルール

- 設計資料は実装前または実装と同時に更新し、関連する実装と同じコミットへ含める
- OpenAPIやDrizzleスキーマなど機械可読な契約を正とし、設計書で値を重複管理しない
- コードを読めば分かる処理詳細、根拠のない将来案、作業ログは記載しない
- 図は文章だけでは関係や流れを理解しにくい場合だけMermaidで追加する
- レビューでは設計資料同士と実装の整合性を確認する

## 参考にした資料

### GitHub Spec Kit

- 資料: [GitHub Spec Kit](https://github.com/github/spec-kit)
- 参考箇所: プロジェクト原則、仕様、技術計画、タスク、実装、整合性分析を段階的に扱う
  Spec-Driven Developmentの流れ。
- このリポジトリへの反映:
  - 常時守る原則を`AGENTS.md`へ配置
  - 要件と完了条件をIssueで管理
  - 機能設計書とADRを実装前後の判断材料として管理
  - Skillsとレビューで資料間の整合性を確認
- 採用しなかった点: 小規模APIに対して全機能で仕様・計画・タスク文書を必須化すると
  更新負荷が大きいため、機能設計書は必要な変更だけに限定。

### Claude Codeのプロジェクト指示

- 資料: [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- 参考箇所: 常時読み込む指示は具体的・簡潔にし、複数手順や一部領域だけに必要な内容は
  Skillsや範囲を限定したルールへ分離する方針。
- このリポジトリへの反映:
  - `AGENTS.md`は常時必要なルールへ限定
  - 設計書の作成・レビュー手順は`design-doc` Skillへ分離
  - 詳細な設計情報は`docs`配下で必要時に参照

### CodexのAGENTS.md

- 資料: [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- 参考箇所: リポジトリ単位・ディレクトリ単位で、実行コマンドや開発ルールをAIへ共有する方法。
- このリポジトリへの反映:
  - リポジトリ共通ルールを`AGENTS.md`に集約
  - 詳細な設計ガイドや手順は参照先を明記

### GitHub Copilotのリポジトリ指示

- 資料: [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
- 参考箇所: AIがビルド・テスト・検証できるよう、実際に動作確認したコマンドと実行順序を
  リポジトリへ記録する方針。
- このリポジトリへの反映:
  - `AGENTS.md`、README、各ガイドへ検証済みコマンドを記載
  - 設計書更新も`npm run check`とレビュー対象に含める

### ADR

- 資料: [Architectural Decision Records](https://adr.github.io/)
- 参考箇所: ADRは重要な設計判断を、その理由・トレードオフ・影響とともに1件ずつ残す記録。
- このリポジトリへの反映:
  - `docs/decisions`で背景、決定、選択肢、影響を短く記録
  - 実装詳細ではなく、将来も参照する判断だけを対象化

### C4 Model

- 資料: [C4 model](https://c4model.com/)
- 参考箇所: システム、コンテナ、コンポーネント、コードという階層で必要な粒度の図を使う考え方。
- このリポジトリへの反映:
  - 現在の規模ではシステム構成・主要な処理フローだけをMermaidで表現
  - コンポーネント図やコード図は必要になるまで作成しない

### OpenAPI Specification

- 資料: [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- 参考箇所: 人間とコンピューターがソースコードを読まずにHTTP APIの能力を理解できる
  標準インターフェース記述。
- このリポジトリへの反映:
  - API契約は機能設計書へ重複記載せず、`openapi/openapi.yaml`を正とする
  - Swagger UI、Prism、レビューで契約を利用
