function calcularMedia(notas) {
    let soma = 0
    for (let i = 0; i < notas.length; i++) {
        soma = soma + notas[i];
    }
    let media = soma / notas.length;
    return media;
}