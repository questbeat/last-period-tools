.DEFAULT_GOAL := help
TS_NODE := yarn run ts-node --project tsconfig.ts-node.json

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

.PHONY: definitions
definitions: ## Generate regalia definitions
	@$(TS_NODE) scripts/definitions.ts

.PHONY: sheet
sheet: ## Download spreadsheet
	@curl -L -o data/regalia.xlsx https://docs.google.com/spreadsheets/d/18hSvxSKns_Y3dlqBs-kzaiILYCy9cSU6IjJzUFucgIs/export?format=xlsx

.PHONY: test
test: ## Test regalia values
	@$(TS_NODE) scripts/test.ts
