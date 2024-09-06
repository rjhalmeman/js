let listaFrutas = [];

function botaoInserir() {
    //alert("deu certo o clic no botão");

    const idFruta =
        document.getElementById("inputId").value;
    const nomeFruta =
        document.getElementById("inputNome").value;
    const corFruta =
        document.getElementById("inputCor").value;
    const pesoFruta =
        document.getElementById("inputPeso").value;
    let fruta = new Fruta(idFruta, nomeFruta, corFruta, pesoFruta);
    //alert(idFruta);
    listaFrutas.push(fruta)
}


function botaoListar() {
    let saida =
        document.getElementById("outputListaDeFrutas");
    saida.innerHTML = "";
    for (let i = 0; i < listaFrutas.length; i++) {
        let f = listaFrutas[i];
        saida.innerHTML += f.id + "-" + f.nome + "-" + f.cor + "-" + f.peso +
            "<br>";

    }


}