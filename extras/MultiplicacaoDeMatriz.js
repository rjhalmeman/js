function multiplicarMatrizes(matrizA, matrizB) {
    // Verifica se o número de colunas de A é igual ao número de linhas de B
    if (matrizA[0].length !== matrizB.length) {
        
        console.log("O número de colunas de A deve ser igual ao número de linhas de B");
        return;
    }

    // Inicializa a matriz C usando dois loops de repetição
    let matrizResultado = [];
    for (let i = 0; i < matrizA.length; i++) {
        matrizResultado[i] = []; // Cria uma nova linha
        for (let j = 0; j < matrizB[0].length; j++) {
            matrizResultado[i][j] = 0; // Inicializa o elemento com zero
        }
    }

    // Multiplica as matrizes
    for (let i = 0; i < matrizA.length; i++) {
        for (let j = 0; j < matrizB[0].length; j++) {
            for (let k = 0; k < matrizA[0].length; k++) {
                matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }

    return matrizResultado;
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

// Exemplo de uso:
const A = [
    [1, 2,1],
    [3, 4,1]
];

const B = [
    [5, 6],
    [7, 8],
    [6, 6]
];

mostrarMatriz(A);
console.log("------------");
mostrarMatriz(B);
console.log("------------");

const C = multiplicarMatrizes(A, B);
mostrarMatriz(C);
