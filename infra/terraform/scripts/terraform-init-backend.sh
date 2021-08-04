#!/bin/bash
set -e

PROJECT_ENV=$1
PROJECT_TSURU_TEAM_OWNER=$2
PROJECT_NAME=$3

echo "PROJECT_ENV: ${PROJECT_ENV}"
echo "PROJECT_TSURU_TEAM_OWNER: ${PROJECT_TSURU_TEAM_OWNER}"
echo "PROJECT_NAME: ${PROJECT_NAME}"
echo

## Verifica se foram definidos todos valores
if [ -z $TSURU_TOKEN ]; then
    echo 'Variavel de ambiente $TSURU_TOKEN nao encontrada'
    exit 1
elif [ -z $PROJECT_ENV ]; then
    echo "Ambiente nao encontrado"
    exit 1
elif [ -z $PROJECT_TSURU_TEAM_OWNER ]; then
    echo "Time no Tsuru dono do projeto nao encontrado"
    exit 1
elif [ -z $PROJECT_NAME ]; then
    echo "Nome projeto nao encontrado"
    exit 1
fi

## Define backend server para o terraform
## Doc:
TERRAFORM_BACKEND_SERVER="https://terraform-backend.globoi.com/state"
TERRAFORM_BACKEND_ADDRESS="${TERRAFORM_BACKEND_SERVER}/${PROJECT_ENV}/team/${PROJECT_TSURU_TEAM_OWNER}/project/${PROJECT_NAME}"

## Pega o diretorio acima
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ] ; do SOURCE="$(readlink "$SOURCE")"; done
DIR="$( pwd )"

## Altera para o diretorio do terraform
cd "${DIR}"

echo "Terraform Backend Server"
echo $TERRAFORM_BACKEND_ADDRESS
echo

TSURU_TOKEN=$(tsuru token-show | awk '{print $NF}')

## Inicia o terraform com o backend server
terraform init -upgrade=true -migrate-state \
    -backend-config="username=tsuru_token" \
    -backend-config="password=${TSURU_TOKEN}" \
    -backend-config="address=${TERRAFORM_BACKEND_ADDRESS}" \
    -backend-config="lock_address=${TERRAFORM_BACKEND_ADDRESS}" \
    -backend-config="unlock_address=${TERRAFORM_BACKEND_ADDRESS}" \
    -backend-config="skip_cert_verification=true"