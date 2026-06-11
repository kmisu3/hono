.DEFAULT_GOAL := help

# Docker Compose で起動中のサービスへ DB コマンドを流す（未起動でも依存を起動）
COMPOSE_RUN := docker compose run --rm api

.PHONY: help
help: ## このヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

## --- Docker ---

.PHONY: up
up: ## コンテナを起動（ビルド込み）
	docker compose up --build

.PHONY: down
down: ## コンテナを停止
	docker compose down

.PHONY: reset
reset: ## DBボリュームごと初期化して再起動
	docker compose down -v
	docker compose up --build

.PHONY: logs
logs: ## API のログを追従表示
	docker compose logs -f api

.PHONY: docs
docs: ## OpenAPI仕様書UIとモックサーバーを起動
	docker compose up openapi mock

.PHONY: shell
shell: ## API コンテナへシェルで入る
	docker compose exec api sh

## --- Database ---

.PHONY: generate
generate: ## スキーマからマイグレーションを生成
	$(COMPOSE_RUN) npm run db:generate

.PHONY: migrate
migrate: ## マイグレーションを適用
	$(COMPOSE_RUN) npm run db:migrate

.PHONY: seed
seed: ## サンプルデータを投入
	$(COMPOSE_RUN) npm run db:seed

.PHONY: studio
studio: ## Drizzle Studio を起動
	docker compose run --rm --service-ports api npm run db:studio

## --- Local (npm) ---

.PHONY: install
install: ## 依存をインストール
	npm install

.PHONY: lint
lint: ## 静的解析（Biome）
	npm run lint

.PHONY: format
format: ## コードを整形（Biome）
	npm run format

.PHONY: test
test: ## テストを実行
	npm test

.PHONY: check
check: ## lint・test・build・差分チェックを一括実行
	npm run check
