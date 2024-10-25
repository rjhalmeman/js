let listaLivro = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let livro = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaLivro.length; i++) {
        const livro = listaLivro[i];
        if (livro.issn == chave) {
            livro.posicaoNaLista = i;
            return listaLivro[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const issn = document.getElementById("inputIssn").value;
    if (issn) { // se digitou um Issn
        livro = procurePorChavePrimaria(issn);
        if (livro) { //achou na lista
            mostrarDadosLivro(livro);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputIssn").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputIssn").focus();

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

    let issn;
    if (livro == null) {
         issn = document.getElementById("inputIssn").value;
    } else {
        issn = livro.issn;
    }

    const nome = document.getElementById("inputNome").value;
    const dataDeLancamento = document.getElementById("inputDataDeLancamento").value;
    const preco = parseFloat(document.getElementById("inputPreco").value);
    const autor = document.getElementById("inputAutor").value;
    const editora = document.getElementById("inputEditora").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(issn && nome && dataDeLancamento && preco && autor && editora ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                livro = new Livro(issn,nome,dataDeLancamento,preco,autor,editora);
                listaLivro.push(livro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                livroAlterado = new Livro(issn,nome,dataDeLancamento,preco,autor,editora);
                listaLivro[livro.posicaoNaLista] = livroAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaLivro.length; i++) {
                    if (livro.posicaoNaLista != i) {
                        novaLista.push(listaLivro[i]);
                    }
                }
                listaLivro = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputIssn").focus();
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
            linha.issn+" - " +
            linha.nome+" - " +
            linha.dataDeLancamento+" - " +
            linha.preco+" - " +
            linha.autor+" - " +
            linha.editora+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaLivro);
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

// Função para mostrar os dados do Livro nos campos
function mostrarDadosLivro(livro) {
    document.getElementById("inputIssn").value = livro.issn;
    document.getElementById("inputNome").value = livro.nome;
    document.getElementById("inputDataDeLancamento").value = livro.dataDeLancamento;
    document.getElementById("inputPreco").value = livro.preco;
    document.getElementById("inputAutor").value = livro.autor;
    document.getElementById("inputEditora").value = livro.editora;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputDataDeLancamento").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("inputAutor").value = "";
    document.getElementById("inputEditora").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputIssn").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputDataDeLancamento").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
    document.getElementById("inputAutor").readOnly = soLeitura;
    document.getElementById("inputEditora").readOnly = soLeitura;
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
    document.getElementById("inputIssn").focus();
}

