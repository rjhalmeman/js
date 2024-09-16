let listaFerramentas = [];
function buscarPorId(idFerramentaProcurada, listaFerramentas) {
    for (let i = 0; i < listaFerramentas.length; i++) {
        const f = listaFerramentas[i];
        if (f.id == idFerramentaProcurada) {
            return f;
        }
    }
    return null;
}


function botaoInserir() {
    // alert("deu certo o botao")

    const idFerramenta = document.getElementById("inputId").value;
    const nomeFerramenta = document.getElementById("inputNome").value;
    const precoUnitarioFerramenta = parseFloat(document.getElementById("inputPrecoUnitario").value);
    const pesoFerramenta = parseFloat(document.getElementById("inputPeso").value);
    const quantidadeFerramenta = parseInt(document.getElementById("inputPeso").value);
    const fabricanteFerramenta = document.getElementById("inputFabricante").value;
   
    // console.log(idFerramenta);
    let ferramenta = new Ferramenta(idFerramenta, 
          nomeFerramenta, precoUnitarioFerramenta, 
          pesoFerramenta,quantidadeFerramenta,fabricanteFerramenta);
    
    const f2 = buscarPorId( ferramenta.id, listaFerramentas);
    if (f2 == null) {
        listaFerramentas.push(ferramenta);
    } else {
        alert("já cadastrada com esse id");
    }
}
function botaoListar(){
    let saida = 
    document.getElementById("outputListaDeFerramentas");
    saida.innerHTML = "";
    if (listaFerramentas.length == 0) {
        alert("A lista está vazia");
    } else {
        for (let i = 0; i < listaFerramentas.length; i++) {
            let f = listaFerramentas[i];
            saida.innerHTML +=
                f.id + " - " +
                f.nome + " - " +
                f.precoUnitario + " - " +
                f.peso + 
                f.quantidade+" - "+
                f.fabricante+ "<br>";
            "<br>";
        }
    }
}