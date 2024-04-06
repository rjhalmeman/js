// Importando o módulo readline para lidar com entrada de usuário via terminal
const readline = require('readline');

// Configurando interface de leitura e escrita
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Perguntando ao usuário o primeiro valor
rl.question('Digite o primeiro valor: ', (valor1) => {
    // Perguntando ao usuário o segundo valor

    // Convertendo os valores para números
    const num1 = parseFloat(valor1);

    let r = num1**(1/3);

    console.log('Resultado:', r);

    // Fechando a interface de leitura
    rl.close();

});
