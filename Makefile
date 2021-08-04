PROJECT_TSURU_TEAM_OWNER = "cartolafc"
PROJECT_NAME = "13431"

help:
	@echo "---------------- HELP ---------------------"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\://'| sed -e 's/##//'

terraform-apply-%:	## Aplica receita terraform
	cd infra/terraform && \
	./scripts/terraform-init-backend.sh $* ${PROJECT_TSURU_TEAM_OWNER} ${PROJECT_NAME} && \
	terraform apply \
	-var-file="$*/public.tfvars"

terraform-plan-%:	## Checa receita terraform
	cd infra/terraform && \
	./scripts/terraform-init-backend.sh $* ${PROJECT_TSURU_TEAM_OWNER} ${PROJECT_NAME} && \
	terraform plan \
	-var-file="$*/public.tfvars"

terraform-refresh-%:	## Refresh na receita terraform
	cd infra/terraform && \
	./scripts/terraform-init-backend.sh $* ${PROJECT_TSURU_TEAM_OWNER} ${PROJECT_NAME} && \
	terraform plan \
	-var-file="$*/public.tfvars"

rpaas-deploy-%: ## Faz o deploy do rpaas (qa|dev|prod)
	@$(eval ENV := $*)
	@cd infra/rpaas && tsuru deploy rpaas-${ENV} apply

rpaas-check-%: ## Faz a verificação do rpaas (qa|dev|prod)
	@$(eval ENV := $*)
	@cd infra/rpaas && tsuru deploy rpaas-${ENV} check

deploy-%:	## Faz o deploy da app
	@$(eval ENV := $*)
	@npm run build:${ENV}
	@tsuru app-deploy -a cartola-kyc-${ENV} .