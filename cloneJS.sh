#!/bin/bash

# Verifica se o git está instalado
if ! command -v git &> /dev/null
then
    echo "O Git não está instalado. Por favor, instale o Git antes de continuar."
    exit
fi

# Executa o comando git clone
if git clone https://github.com/rjhalmeman/js; then
    echo "Repositório clonado com sucesso!"
else
    echo "Ocorreu um erro ao clonar o repositório."
fi

