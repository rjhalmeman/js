let A = [[1, 3], [2, 7]];
let B = [[7, 1], [3, 2]];
let C = [[0, 0], [0, 0]];


function somarMatriz(A, B) {
    C = A; //cria uma matriz igual a matriz A, cujos valores serão substituídos.
    for (let i = 0; i < A.length; i++) {
       for (let j = 0; j < B.length; j++) {
        C[i][j] = A[i][j]+B[i][j];        
       }
    }
    return C;
}

somarMatriz(A,B);
console.log(C);
