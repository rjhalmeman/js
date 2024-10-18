let listaFilme = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let filme = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaFilme.length; i++) {
        const filme = listaFilme[i];
        if (filme.id == chave) {
            filme.posicaoNaLista = i;
            return listaFilme[i];
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
        filme = procurePorChavePrimaria(id);
        if (filme) { //achou na lista
            mostrarDadosFilme(filme);
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
    if (filme == null) {
         id = parseInt(document.getElementById("inputId").value);
    } else {
        id = filme.id;
    }

    const nome = document.getElementById("inputNome").value;
    const genero = document.getElementById("inputGenero").value;
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const duracao = parseInt(document.getElementById("inputDuracao").value);
    const estudio = document.getElementById("inputEstudio").value;
    const diretor = document.getElementById("inputDiretor").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(id && nome && genero && dataLancamento && duracao && estudio && diretor ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                filme = new Filme(id,nome,genero,dataLancamento,duracao,estudio,diretor);
                listaFilme.push(filme);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                filmeAlterado = new Filme(id,nome,genero,dataLancamento,duracao,estudio,diretor);
                listaFilme[filme.posicaoNaLista] = filmeAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaFilme.length; i++) {
                    if (filme.posicaoNaLista != i) {
                        novaLista.push(listaFilme[i]);
                    }
                }
                listaFilme = novaLista;
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
            linha.id+" - " +
            linha.nome+" - " +
            linha.genero+" - " +
            linha.dataLancamento+" - " +
            linha.duracao+" - " +
            linha.estudio+" - " +
            linha.diretor+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaFilme);
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

// Função para mostrar os dados do Filme nos campos
function mostrarDadosFilme(filme) {
    document.getElementById("inputId").value = filme.id;
    document.getElementById("inputNome").value = filme.nome;
    document.getElementById("inputGenero").value = filme.genero;
    document.getElementById("inputDataLancamento").value = filme.dataLancamento;
    document.getElementById("inputDuracao").value = filme.duracao;
    document.getElementById("inputEstudio").value = filme.estudio;
    document.getElementById("inputDiretor").value = filme.diretor;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputDuracao").value = "";
    document.getElementById("inputEstudio").value = "";
    document.getElementById("inputDiretor").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputDuracao").readOnly = soLeitura;
    document.getElementById("inputEstudio").readOnly = soLeitura;
    document.getElementById("inputDiretor").readOnly = soLeitura;
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

