// Importando o módulo readline do Node.js para interagir com o usuário no terminal
const readline = require('readline');

// Configurando a interface readline para entrada e saída
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para verificar se o número é par ou ímpar
function verificarParOuImpar(numero) {
  if (numero % 2 === 0) {
    return 'Par';
  } else {
    return 'Ímpar';
  }
}



// Perguntar ao usuário para digitar um número
rl.question('Digite um número: ', (numero) => {
  // Converter a entrada do usuário para um número inteiro
  numero = parseInt(numero);

  // Verificar se o número é válido
  if (isNaN(numero)) {
    console.log('Por favor, digite um número válido.');
  } else {
    // Verificar se o número é par ou ímpar e imprimir o resultado
    console.log(`${numero} é ${verificarParOuImpar(numero)}.`);
  }

  // Fechar a interface readline
  rl.close();
});
