const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o valor de x: ', (x) => {
  // Converte o valor de x para um número em ponto flutuante
  x = parseFloat(x);

  if (!isNaN(x)) {
    // Calcula o quadrado de x
    const resultado = calcularQuadrado(x);
    console.log(`O resultado de f(${x}) = ${resultado}`);
  } else {
    console.log("Por favor, insira um valor numérico válido.");
  }

  rl.close();
});

function calcularQuadrado(x) {
  return x * x;
}
