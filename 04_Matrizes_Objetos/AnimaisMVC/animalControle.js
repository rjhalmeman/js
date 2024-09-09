let listaDeAnimais = []

function inserirNaLista(){
    const id = parseInt(
     document.getElementById("inputId").value);
     const nome = 
     document.getElementById("inputNome").value;
     const especie = 
     document.getElementById("inputEspecie").value;
     const peso = parseFloat(
     document.getElementById("inputPeso").value);
     const dataNascimento = 
     document.getElementById("inputDataNascimento").value;

     let linha = 
     new Animal(id, nome, especie,peso, dataNascimento);
    
     listaDeAnimais.push(linha);

     limparCampos();
     listarAnimais();

}

function listarAnimais(){
    let saida = document.getElementById("outputListaAnimais");
    saida.innerHTML = "";   
    for (let i = 0; i < listaDeAnimais.length; i++) {
        let animal = listaDeAnimais[i];
        saida.innerHTML += 
            animal.id+" - "+
            animal.nome+" - "+
            animal.especie+" - "+
            animal.peso+" - "+
            animal.dataNascimento+
            "<br>";        
    }
}

function limparCampos(){
    document.getElementById("inputId").value = "";
    document.getElementById("inputNome").value = "";
    document.getElementById("inputEspecie").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputDataNascimento").value = "";
}