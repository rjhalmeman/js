// Importando o módulo readline para lidar com entrada de usuário
const readline = require('readline');

// Criando uma interface de leitura
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para calcular o antecessor
function antecessor(numero) {
    return numero - 1;
}

// Função para calcular o sucessor
function sucessor(numero) {
    return numero + 1;
}

// Função para exibir o resultado
function exibirResultado(ant,suc) {
    console.log(`Antecessor: ${ant}`);
    console.log(`Sucessor: ${suc}`);
}

// Perguntando ao usuário para digitar um número inteiro .
rl.question('Digite um número inteiro: ', (numero) => {
    // Convertendo a entrada do usuário para um número inteiro
    numero = parseInt(numero);

    // Verificando se a entrada é um número
    if (isNaN(numero)) {
        console.log('Por favor, insira um número válido.');
    } else {
        let ant = antecessor(numero);
        let suc = sucessor(numero);
        exibirResultado(ant,suc);
    }

    rl.close(); // Fechando a interface de leitura
});
