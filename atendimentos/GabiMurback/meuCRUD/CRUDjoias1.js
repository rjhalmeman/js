
function salvar() {
    let id;
    if (joias == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = joias.id;
    }
    const inputNome = document.getElementById("inputNome").value;
    const inputMetal = document.getElementById("inputMetal").value;
    const inputDataFabricacao = document.getElementById("inputDataFabricacao").value;
    const inputTipo = document.getElementById("inputTipo").value;

    if (id != null && id > 0 && inputNome && inputMetal && inputDataFabricacao && inputTipo) {
        // Verifica se o ID já existe antes de inserir
        if (oQueEstaFazendo === "inserindo" && procurePorChavePrimaria(id)) {
            mostrarAviso("Erro: Já existe um item com este ID.");
            return; // Sai da função sem inserir
        }

        switch (oQueEstaFazendo) {
            case "inserindo":
                joias = new Joias(id, inputNome, inputMetal, inputDataFabricacao, inputTipo);
                listaJoias.push(joias);
                mostrarAviso("Inserido na lista");
                break;
            case "alterando":
                joiasAlterado = new Joias(id, inputNome, inputMetal, inputDataFabricacao, inputTipo);
                listaJoias[joias.posicaoNaLista] = joiasAlterado;
                mostrarAviso("Alterado");
                break;
            case "excluindo":
                listaJoias = listaJoias.filter((item, index) => index !== joias.posicaoNaLista);
                mostrarAviso("Excluído");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes("inline", "none", "none", "none", "none");
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}
