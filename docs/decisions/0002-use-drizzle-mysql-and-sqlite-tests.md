# MySQLとDrizzle ORMを採用し、通常テストではSQLiteを利用する

- 状態: 採用
- 決定日: 2026-06-12

## 背景

ローカル開発ではMySQLを利用しつつ、通常のテストはDBコンテナへ依存せず高速に実行したい。
また、Honoの軽量な構成を維持しながら型安全にDBへアクセスする必要がある。

## 決定

開発・実行用DBにMySQL 8.4、ORMとマイグレーションにDrizzle ORM / Drizzle Kitを採用する。
通常のAPI・RepositoryテストではインメモリSQLiteを使用し、DB固有実装はRepositoryで分離する。

## 選択肢

- Drizzle ORM: SQLに近く、TypeScriptの型安全性と軽量な構成を両立できるため採用。
- Prisma: 高機能だが、現在のAPI規模に対して生成物と抽象度が大きいため不採用。
- MySQLを使う通常テスト: 実行時間と環境依存が増えるため不採用。

## 影響

- MySQLとSQLiteで個別のDrizzleスキーマを管理する。
- MySQL固有の型、制約、マイグレーションはMySQL環境で別途確認する。
- テストのためだけに本番DB設計をSQLiteへ合わせない。

## 関連資料

- [`docs/database.md`](../database.md)
- [`docs/table-definitions/todos.md`](../table-definitions/todos.md)
