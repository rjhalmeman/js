// Importa o módulo readline para ler a entrada do usuário
const readline = require('readline');

// Cria uma interface para leitura da entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Inicializa a variável para a soma
let soma = 0;

// Função para perguntar ao usuário e somar números
function perguntarNumero() {
    rl.question('Digite um número (ou "sair" para finalizar): ', (input) => {
        // Verifica se o usuário digitou "sair"
        if (input.toLowerCase() === 'sair') {
            console.log('A soma dos números é: ' + soma);
            rl.close();
        } else {
            // Converte a entrada para um número
            let numero = parseFloat(input);

            // Verifica se a entrada é um número válido
            if (!isNaN(numero)) {
                // Adiciona o número à soma
                soma += numero;
            } else {
                console.log('Por favor, digite um número válido.');
            }

            // Pergunta novamente
            perguntarNumero();
        }
    });
}

// Inicia a primeira pergunta
perguntarNumero();
