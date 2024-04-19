// Importando o módulo 'readline' para lidar com entrada de dados via terminal
const readline = require('readline');

// Criando uma interface para entrada de dados via terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para entrada de dados
function obterEntrada() {
    return new Promise((resolve, reject) => {
        rl.question("Digite o primeiro número: ", (primeiro) => {
            rl.question("Digite o segundo número: ", (segundo) => {
                resolve([parseFloat(primeiro), parseFloat(segundo)]);
            });
        });
    });
}

// Função para processamento de dados
function verificar(primeiro, segundo) {
    if (primeiro > segundo) {
        return "O primeiro é maior que o segundo";
    } else if (primeiro < segundo) {
        return "O segundo é maior que o primeiro";
    } else {
        return "Os valores são iguais";
    }
}

// Função para exibição de resultados
function exibirResultado(resultado) {
    console.log(resultado);
    rl.close();
}

// Função principal para coordenar a entrada, processamento e saída de dados.
async function main() {
    try {
        const entrada = await obterEntrada();
        const resultado = verificar(entrada[0], entrada[1]);
        exibirResultado(resultado);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}

// Chamando a função principal para iniciar o programa
main();
