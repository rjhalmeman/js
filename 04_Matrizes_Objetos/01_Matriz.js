let mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9],[8,8,8]];

for (let i = 0; i < mat.length; i++) {
    let aux='';
    for (let j = 0; j < mat[0].length; j++) {
      aux = aux + mat[i][j]+" "
    }
    console.log(aux + "\n");
}