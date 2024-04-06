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
    rl.question('Digite o segundo valor: ', (valor2) => {
        // Convertendo os valores para números
        const num1 = parseFloat(valor1);
        const num2 = parseFloat(valor2);
        
        // Verificando se os valores são números válidos
        if (!isNaN(num1) && !isNaN(num2)) {
            // Calculando a soma
            const soma = num1 + num2;
            
            // Exibindo o resultado
            console.log('A soma dos valores é:', soma);
        } else {
            console.log('Pelo menos um dos valores digitados não é um número válido.');
        }
        
        // Fechando a interface de leitura
        rl.close();
    });
});
