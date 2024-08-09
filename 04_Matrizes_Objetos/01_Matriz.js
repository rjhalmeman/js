let mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [8, 8, 8]];

for (let i = 0; i < mat.length; i++) {
  let aux = '';
  for (let j = 0; j < mat[0].length; j++) {
    aux = aux + mat[i][j] + " "
  }
  console.log(aux);
}
let soma = 0;
for (let linha = 0; linha < mat.length; linha++) {
  soma = soma + mat[linha][2];
}
console.log("soma coluna =" + soma);

 soma = 0;
for (let coluna = 0; coluna < mat[2].length; coluna++) {
  soma = soma + mat[2][coluna];
}
console.log("soma linha =" + soma);