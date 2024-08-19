function criarMatrizAleatoria(m, n) {
    let matriz = [];
    for (let i = 0; i < m; i++) {
        matriz[i] = [];
        for (let j = 0; j < n; j++) {
            let numAleatorio = Math.random(); // Gera um número aleatório entre 0 e 1
            matriz[i][j] = parseInt(numAleatorio*100); // ajusta para que os números fiquem entre 0 e 100  
        }
    }
    return matriz;
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

  function somaElementosDasColunas(matriz){
    
  }

  matriz = criarMatrizAleatoria(3,4);

