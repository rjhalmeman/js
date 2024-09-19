function converterDadosEmMatriz(dadosDeEntrada) {
    // Separa em linhas
    let linhas = dadosDeEntrada.trim().split("\n"); //o sinal para o split é no "\n", divide usando como sinal a quebra de linha
    let matriz = [];

    // Itera sobre cada linha
    for (let i = 0; i < linhas.length; i++) {
        // Separa os números por vírgula e converte-os para números
        let linha = linhas[i].split(",").map(Number);
        matriz.push(linha); //acrescenta os números na linha da variavel matriz
    }
    return matriz;
}


function gerarTransposta(matriz) {
    let matrizTransporta = [];
    for (let i = 0; i < matriz[0].length; i++) {
        matrizTransporta[i] = [];
        for (let j = 0; j < matriz.length; j++) {
            matrizTransporta[i][j] = matriz[j][i];
        }
    }
    return matrizTransporta
}

function matrizFormatadaParaHTML(matriz) {
    // Converte a matriz para html com formatação para exibição
    let output = "";
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            output += matriz[i][j].toString().padStart(3, ' '); // Adiciona o elemento atual à string de saída
            if (j < matriz[i].length - 1) {
                output += " "; //
            }
        }
        output += "<br>"; // 
    }
    return output;
}


if (false) {

    let matriz = [[2, 13, 4], [51, 6, 7]];
    console.log(matrizFormatadaParaHTML(matriz));

    let m = gerarTransposta(matriz);
    console.log("------")
    console.log(matrizFormatadaParaHTML(m));
}