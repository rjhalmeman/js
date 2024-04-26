#!/bin/bash

# Adiciona todas as alterações ao índice do Git
git add .

# Obtém a data e hora atual e formata para o formato desejado (por exemplo, YYYY-MM-DD HH:MM:SS)
timestamp=$(date +"%d/%m/%Y - %H:%M:%S")

# Realiza um commit com a mensagem contendo a data e hora
git commit -m "$timestamp"

# Faz o push para o repositório remoto no GitHub
git push --force https://github.com/rjhalmeman/js
