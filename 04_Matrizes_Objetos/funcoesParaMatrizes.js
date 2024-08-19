
function criarMatrizAleatoria(m, n) {
    let matriz = [];
    for (let i = 0; i < m; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            let numAleatorio = Math.random(); // Gera um número aleatório entre 0 e 1
            matriz[i][j] = parseInt(numAleatorio * 100); // ajusta para que os números fiquem entre 0 e 100
        }
    }
    return matriz;
}

function mostrarMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        let aux = "";
        for (let j = 0; j < matriz[0].length; j++) {
            aux += matriz[i][j].toString().padStart(3, ' ') + " ";
        }
        console.log(aux);
    }
}
function somarElementosDeCadaColuna(matriz) {
    let soma = [];
    for (let j = 0; j < matriz[0].length; j++) {
        soma[j] = 0;
        for (let i = 0; i < matriz.length; i++) {
            soma[j] = soma[j] + matriz[i][j];
        }
    }
    return soma;
}

function mediaDeCadaLinha(matriz) {
    let media = [];
    for (let i = 0; i < matriz.length; i++) {
        media[i] = 0;
        soma = 0;
        for (let j = 0; j < matriz[0].length; j++) {
            soma = soma + matriz[i][j];
        }
        media[i] = soma / matriz[0].length;
    }
    return media;
}

function somaTodosOsElementos(matriz) {
    let soma = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            soma = soma + matriz[i][j];
        }
    }
    return soma;
}

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


/*
Leia uma matriz de ordem 3x4 (3 linhas e 4 colunas).Faça uma
função (para cada item) que calcule e mostre.
a) soma dos elementos de cada coluna.
b) média de cada linha.
c) a soma de todos os elementos da matriz.
*/
let mostrar = false;
if (mostrar) {

    let m = criarMatrizAleatoria(3, 4);
    mostrarMatriz(m);

    let resultado = somarElementosDeCadaColuna(m);
    console.log("soma de cada coluna = " + resultado);

    let resultadoMedia = mediaDeCadaLinha(m);
    console.log("Resultado média = " + resultadoMedia);

    let somaTotal = somaTodosOsElementos(m);
    console.log("A soma de todos os elementos é = " + somaTotal);
}