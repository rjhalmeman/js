// Berola da Silva Sauro


function formataONome(nome) {
    let i = nome.length - 1;
    while (nome[i] != ' ') {
        i--;
    }
    let pos = i;
    let aux = "";
    for (let i = pos; i < nome.length; i++) {
        aux += nome[i];
    }
    aux += ', ';
    for (let i = 0; i < pos; i++) {
        aux += nome[i];
    }
    return aux;
}

if (false) {
    let n = "Berola da Silva Sauro Pereira";
    let ni = formataONome(n);
    console.log(ni);
}
