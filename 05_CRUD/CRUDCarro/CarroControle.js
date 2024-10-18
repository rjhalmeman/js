let listaCarro = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let carro = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCarro.length; i++) {
        const carro = listaCarro[i];
        if (carro.placa == chave) {
            carro.posicaoNaLista = i;
            return listaCarro[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const placa = document.getElementById("inputPlaca").value;
    if (placa) { // se digitou um Placa
        carro = procurePorChavePrimaria(placa);
        if (carro) { //achou na lista
            mostrarDadosCarro(carro);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputPlaca").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputPlaca").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let placa;
    if (carro == null) {
        placa = document.getElementById("inputPlaca").value;
    } else {
        placa = carro.placa;
    }

    const nome = document.getElementById("inputNome").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const peso = parseInt(document.getElementById("inputPeso").value);
    const cor = document.getElementById("inputCor").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (placa && nome && dataLancamento && peso && cor) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                carro = new Carro(placa, nome, dataLancamento, peso, cor);
                listaCarro.push(carro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                carroAlterado = new Carro(placa, nome, dataLancamento, peso, cor);
                listaCarro[carro.posicaoNaLista] = carroAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCarro.length; i++) {
                    if (carro.posicaoNaLista != i) {
                        novaLista.push(listaCarro[i]);
                    }
                }
                listaCarro = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputPlaca").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.placa + " - " +
            linha.nome + " - " +
            linha.dataLancamento + " - " +
            linha.peso + " - " +
            linha.cor + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCarro);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Carro nos campos
function mostrarDadosCarro(carro) {
    document.getElementById("inputPlaca").value = carro.placa;
    document.getElementById("inputNome").value = carro.nome;
    document.getElementById("inputDataLancamento").value = carro.dataLancamento;
    document.getElementById("inputPeso").value = carro.peso;
    document.getElementById("inputCor").value = carro.cor;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputCor").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputPlaca").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputCor").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputPlaca").focus();
}

