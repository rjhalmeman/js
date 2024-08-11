

function lerMatrizEmTextArea(dadosDeEntrada) {
  // Separa em linhas
  let linhas = dadosDeEntrada.trim().split("\n"); //o sinal para o split é no "\n", divide usando como sinal a quebra de linha
  let matriz = [];

  // Itera sobre cada linha
  for (let i = 0; i < linhas.length; i++) {
    // Separa os números por vírgula e converte-os para números
    let numeros = linhas[i].split(",").map(Number);
    matriz.push(numeros);
  }
  return matriz;
}


function printarMatriz(matriz) {
  // Converte a matriz para string com formatação para exibição
  let output = "";
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      output += matriz[i][j]; // Adiciona o elemento atual à string de saída
      if (j < matriz[i].length - 1) {
        output += " "; // Adiciona um espaço entre os elementos, exceto após o último elemento da linha
      }
    }
    output += "\n"; // Adiciona uma nova linha após cada subarray
  }
  return output;
}


function somarColuna(mat, coluna) {
  let soma = 0;
  for (let linha = 0; linha < mat.length; linha++) {
    soma = soma + mat[linha][coluna];
  }
  return soma;
}

function somarLinha(mat, linha) {
  soma = 0;
  for (let coluna = 0; coluna < mat[2].length; coluna++) {
    soma = soma + mat[linha][coluna];
  }
  return soma;
}

function somarDiagonalPrincipal(mat) {
  soma = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (i == j) {
        soma = soma + mat[i][j];
      }
    }
  }
  return soma;
}

function somarDiagonalSecundaria(mat) {
  soma = 0;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if ((i + j)==(mat[0].length-1)) {
        soma = soma + mat[i][j];
      }
    }
  }
  return soma;
}

//testes no terminal
let fazerTeste = true;
if (fazerTeste) {
  let matriz = [[2, 2, 1], [4, 1, 6], [5, 8, 5]];
  console.log(printarMatriz(matriz));
  console.log("soma dos elementos da diagonal principal " + somarDiagonalPrincipal(matriz));
  console.log("soma dos elementos da diagonal secundaria " + somarDiagonalSecundaria(matriz));
}
