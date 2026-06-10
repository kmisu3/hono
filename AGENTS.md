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
- 一括チェック: `npm run check`
- 手動コミット前チェック: `npm run commit:check`

## 開発ルール

- 変更は依頼されたタスクの範囲内に限定。
- 動作を変更する場合はテストを追加・更新。
- 外部入力はZodで検証。
- ルートハンドラーとJSONレスポンスは簡潔で一貫した形を維持。
- 秘密情報、`.env`、生成された`dist/`、`node_modules/`はコミット対象外。
- 明示的な依頼がない限り、pushとPull Request作成は実行対象外。

## コミット手順

1. `git status`と全差分を確認。
2. `npm run commit:check`を実行。
3. 対象タスクに関係するファイルだけをステージ。
4. `git diff --cached`でステージ済み差分を確認。
5. 変更内容が分かる簡潔な日本語メッセージでコミット。
6. 自動pushは禁止。

## Agent Skills

- 共通Skillsの実体: `.agents/skills`
- Claude Code: `.claude/skills`から共通Skillsを参照
- Cursor: `.cursor/skills`から共通Skillsを参照
- Codex: `.codex/skills`から共通Skillsを参照
- `/check`: 標準チェックの実行
- `/commit [コミット内容]`: 日本語メッセージでコミット。pushは実行対象外
