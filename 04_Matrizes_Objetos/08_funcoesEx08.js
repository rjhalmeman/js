// Importa a função mostrarMatriz do arquivo utils.js
const { mostrarMatriz } = require('./utilsMatrizes');

function posicaoNaMatriz(matriz, numero) {
    let pos = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (numero === matriz[i][j]) {
                pos.push([i, j]);
                //return pos;
            }
        }
    }
    return pos;
}

m = [[1, 2, 3], [4, 5, 6], [7, 5, 9]];

mostrarMatriz(m);
let p = posicaoNaMatriz(m,5);

if (p) {
    // p.forEach(pos => {
    //     console.log(`[${pos[0]}, ${pos[1]}]`);
    // });
    for (let i = 0; i < p.length; i++) {
        console.log(p[i]);        
    }


} else {
    console.log("não está na matriz");
}