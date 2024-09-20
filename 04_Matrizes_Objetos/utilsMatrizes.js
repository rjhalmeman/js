
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

// Exporta a função para que possa ser usada em outros arquivos js
module.exports = { mostrarMatriz };
