# AI開発ツール間でAgent Skillsを共有する

- 状態: 採用
- 決定日: 2026-06-12

## 背景

Claude Code、Cursor、Codexで同じ開発手順を利用し、ツールごとの指示やCommandsの重複を
避ける必要がある。

## 決定

共通Skillsの実体を`.agents/skills`へ配置し、`.claude/skills`、`.cursor/skills`、
`.codex/skills`からシンボリックリンクで参照する。常時適用するルールは`AGENTS.md`、
複数手順を伴う作業はSkillsへ置く。

## 選択肢

- 共通Skillsをシンボリックリンクで共有: 一つの定義を複数ツールで利用できるため採用。
- ツールごとにCommandsやSkillsを複製: 内容がずれやすいため不採用。
- 全手順を`AGENTS.md`へ記載: 常時コンテキストが大きくなり、作業固有の手順が埋もれるため不採用。

## 影響

- Skill変更はClaude Code、Cursor、Codexへ同時に反映される。
- ツール固有の記法ではなくAgent Skills標準を優先する。
- Skill追加・変更時は構文検証と実利用テストを行う。

## 関連資料

- [`docs/ai-tools.md`](../ai-tools.md)
