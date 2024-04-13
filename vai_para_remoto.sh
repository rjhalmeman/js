#!/bin/bash

# Adiciona todas as alterações ao índice do Git
git add .

# Realiza um commit com a mensagem passada como argumento
git commit -m "$1"

# Faz o push para o repositório remoto no GitHub
git push https://github.com/rjhalmeman/js "$2"

