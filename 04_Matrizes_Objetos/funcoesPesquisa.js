function procureONumero(num, matriz){
    let resp = [];
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j]===num) {
                resp.push([i,j]);
            }            
        }        
    }
    return resp;
}

function mostrarMatriz(matriz) {
    for (let i = 0; i < matriz.length; i++) {
        let aux = "";
        for (let j = 0; j < matriz[0].length; j++) {
            aux += matriz[i][j].toString().padStart(5, ' ') + " ";
        }
        console.log(aux);
    }
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

  

let matriz = [[8,1,3,7,4],[5,33,1,9,2],[4,6,777,5,4]];
mostrarMatriz(matriz);
let r = procureONumero(8,matriz);

console.log(r);