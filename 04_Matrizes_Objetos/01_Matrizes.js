/*
funções para manipulação de matrizes bidimencionais
*/

function lerMatrizEmTextArea(dadosDeEntrada) {
  // Separa em linhas
  let linhas = dadosDeEntrada.trim().split("\n"); //o sinal para o split é no "\n", divide usando como sinal a quebra de linha
  let matriz = [];

  // Itera sobre cada linha
  for (let i = 0; i < linhas.length; i++) {
    // Separa os números por vírgula e converte-os para números
    let numeros = linhas[i].split(",").map(Number);
    matriz.push(numeros); //acrescenta os números na linha da variavel matriz
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

function mostrarMatriz(matriz) {
  for (let i = 0; i < matriz.length; i++) {
      let aux = "";
      for (let j = 0; j < matriz[0].length; j++) {
          aux += 
          matriz[i][j].toString().padStart(5, ' ') 
          + " ";
      }
      console.log(aux);
  }
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
      if ((i + j) == (mat.length - 1)) {
        soma = soma + mat[i][j];
      }
    }
  }
  return soma;
}

function elementosDaDiagonalPrincipal(mat) {
  elementos = '';
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (i == j) {
        elementos = elementos + mat[i][j] + ',';
      }
    }
  }
  elementos = elementos.substring(0, elementos.length - 1);

  return elementos;
}

function somarColuna(mat,coluna){
  let soma = 0;
  for (let i = 0; i < mat.length; i++) {
     soma = soma+mat[i][coluna];    
  }
  return soma;
}


function criarMatrizAleatoria(m, n) {
  let matrix = [];
  for (let i = 0; i < m; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
          let numAleatorio = Math.random(); // Gera um número aleatório entre 0 e 1
          matrix[i][j] = parseInt(numAleatorio*100); // ajusta para que os números fiquem entre 0 e 100

      }
  }
  return matrix;
}

//testes no terminal
let fazerTeste = true;
if (fazerTeste) {
  //let matriz = [[2, 2, 1,4], [4, 1, 6,6], [5, 8, 5,8]];
 
  let randomMatrix = criarMatrizAleatoria(5, 8);
  //console.log(randomMatrix);
  
  mostrarMatriz(randomMatrix);
 // console.log(printarMatriz(matriz));


  console.log(somarColuna(randomMatrix,2));

  //console.log("soma dos elementos da diagonal principal " + somarDiagonalPrincipal(matriz));
  //console.log("soma dos elementos da diagonal secundaria " + somarDiagonalSecundaria(matriz));
}
