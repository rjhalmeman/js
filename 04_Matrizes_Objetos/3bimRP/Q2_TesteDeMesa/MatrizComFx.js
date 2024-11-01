
// Função para aplicar a regra e gerar uma nova matriz resultante
function aplicarRegra(matriz, ex) {
    let novaMatriz = [];

    for (let i = 0; i < matriz.length; i++) {
        novaMatriz[i] = [];
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] % 2 == 0) {
                novaMatriz[i][j] = matriz[i][j] ** ex[0];
            } else {
                novaMatriz[i][j] = matriz[i][j] ** ex[1];
            }
        }
    }
    return novaMatriz;
}

// Definindo a matriz 2x3 com valores 
let matriz = [
    [2, 4, 5],
    [7, 1, 3]
];

// Definindo o vetor 
let p = [2, 3];

// Aplicando a regra à matriz original e exibindo a matriz resultante
let matrizAtualizada = aplicarRegra(matriz, p);
console.log(matrizAtualizada);
