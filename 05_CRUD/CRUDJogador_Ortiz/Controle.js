let listaJogadores = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let jogador = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaJogadores.length; i++) {
        const jogador = listaJogadores[i];
        if (jogador.id == chave) {
            jogador.posicaoNaLista = i;
            return listaJogadores[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        jogador = procurePorChavePrimaria(id);
        if (jogador) { //achou na lista
            mostrarDadosjogador(jogador);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

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

    let id;
    if (jogador == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = jogador.id;
    }

    const nomeDojogador = document.getElementById("inputNome").value;
    const dataDeNascimento = document.getElementById("dataDeNascimento").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nomeDojogador && dataDeNascimento) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                jogador = new Jogador(id, nomeDojogador, dataDeNascimento);
                listaJogadores.push(jogador);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                jogadorAlterado = new Jogador(id, nomeDojogador, dataDeNascimento);
                listaJogadores[jogador.posicaoNaLista] = jogadorAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaJogadores.length; i++) {
                    if (jogador.posicaoNaLista != i) {
                        novaLista.push(listaJogadores[i]);
                    }
                }
                listaJogadores = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
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
            linha.id + " - " +
            linha.nome + " - " +
            linha.dataDenascimento +
            "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaJogadores);
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

// Função para mostrar os dados do jogador nos campos
function mostrarDadosjogador(jogador) {
    document.getElementById("inputId").value = jogador.id;
    document.getElementById("inputNome").value = jogador.nome;
    document.getElementById("dataDeNascimento").value = jogador.dataDenascimento;
    // Define os campos como readonly
    const dataChecjin = new Date(jogador.dataDenascimento);
    const dataChekout = new Date();

    let functionVerificarCategoria = VerificarCategoria(dataChecjin, dataChekout);
    document.getElementById("categoria").value = functionVerificarCategoria
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("dataDeNascimento").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("dataDeNascimento").readOnly = soLeitura;
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
    document.getElementById("inputId").focus();
}
function VerificarCategoria(dataMenor, dataMaior) {
    const categoria = Math.ceil((dataMaior - dataMenor) / (1000 * 60 * 60 * 24) / 365);
    console.log(categoria);


    let categoria2 = '';
    if (categoria <= 8) {
        categoria2 = "você é sub 8"
    }
    else if (categoria <= 10) {
        categoria2 = "você é sub 10"
    }
    else if (categoria <= 12) {
        categoria2 = "você é sub 12"
    }
    else if (categoria <= 16) {
        categoria2 = "você é sub 16"
    }
    else if (categoria <= 18) {
        categoria2 = "você é sub 18"
    }
    else {
        categoria2 = "você é adulto"
    }
    return categoria2;
}