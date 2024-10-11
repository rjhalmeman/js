let listaAlunos = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let aluno = null; //variavel global 

window.onload = inserirDadosIniciais();

//metodo para mostrar mensagem quando o foco for para a chave primaria 
document.getElementById("inputRa").addEventListener("focus", function () {
    mostrarAviso("Digite o RA e clic no botão procure");
});

//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.ra == chave) {
            aluno.posicaoNaLista = i; // se achou, guarda nesse atributo a posição na lista (índice)
            return listaAlunos[i];//se achou, interrompe o laço de repetição e devolve a linha inteira
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   ---------------------------------------------------------
function procure() {
    const ra = document.getElementById("inputRa").value;
    if (ra) { // se digitou um Ra
        aluno = procurePorChavePrimaria(ra);
        if (aluno) { //achou na lista
            mostrarDadosAluno(aluno);
            visibilidadeDosBotoes('inline', 'none', 
                'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else { // se deixou o Ra em branco e tentou procurar
        document.getElementById("inputRa").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    liberarEdicaoDaChaveOuAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputRa").focus();

    //para facilitar os testes sem ter que digitar notas (vai sumir quando terminarem os testes)
    document.getElementById("inputNota1").value = 7;
    document.getElementById("inputNota2").value = 7;
    document.getElementById("inputNota3").value = 7;
    document.getElementById("inputNota4").value = 7;
}

// Função para alterar um elemento da lista
function alterar() {
    // Remove o readonly dos campos
    liberarEdicaoDaChaveOuAtributos(true);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    liberarEdicaoDaChaveOuAtributos(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista
    const ra = document.getElementById("inputRa").value;
    const nome = document.getElementById("inputNome").value;

    let nota1 = parseFloat(document.getElementById("inputNota1").value);
    let nota2 = parseFloat(document.getElementById("inputNota2").value);
    let nota3 = parseFloat(document.getElementById("inputNota3").value);
    let nota4 = parseFloat(document.getElementById("inputNota4").value);

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (ra &&
        nome &&
        !isNaN(parseFloat(nota1)) && nota1 >= 0 && nota1 <= 10 &&
        !isNaN(parseFloat(nota2)) && nota2 >= 0 && nota2 <= 10 &&
        !isNaN(parseFloat(nota3)) && nota3 >= 0 && nota3 <= 10 &&
        !isNaN(parseFloat(nota4)) && nota4 >= 0 && nota4 <= 10
    ) { // se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                aluno = new Aluno(ra, nome, nota1, nota2, nota3, nota4);
                listaAlunos.push(aluno);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                alunoAlterado = new Aluno(ra, nome, nota1, nota2, nota3, nota4);
                listaAlunos[aluno.posicaoNaLista] = alunoAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAlunos.length; i++) {
                    if (aluno.posicaoNaLista != i) {
                        novaLista.push(listaAlunos[i]);
                    }
                }
                listaAlunos = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputRa").focus();
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
        texto += linha.ra + " - " +
            linha.nome + " - " +
            linha.nota1 + " - " +
            linha.nota2 + " - " +
            linha.nota3 + " - " +
            linha.nota4 + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaAlunos);
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

// Função para mostrar os dados do aluno nos campos
function mostrarDadosAluno(aluno) {
    document.getElementById("inputNome").value = aluno.nome;
    document.getElementById("inputNota1").value = aluno.nota1;
    document.getElementById("inputNota2").value = aluno.nota2;
    document.getElementById("inputNota3").value = aluno.nota3;
    document.getElementById("inputNota4").value = aluno.nota4;

    // Define os campos como readonly
    liberarEdicaoDaChaveOuAtributos(false);
}

function liberarEdicaoDaChaveOuAtributos(soLeitura) {
    //quando chamado com true, tranca a chave e libera os outros atributos. False, faz o contrário..
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputRa").readOnly = soLeitura;
    document.getElementById("inputNome").readOnly = !soLeitura;
    document.getElementById("inputNota1").readOnly = !soLeitura;
    document.getElementById("inputNota2").readOnly = !soLeitura;
    document.getElementById("inputNota3").readOnly = !soLeitura;
    document.getElementById("inputNota4").readOnly = !soLeitura;
}

// Função para limpar os dados
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNota1").value = "";
    document.getElementById("inputNota2").value = "";
    document.getElementById("inputNota3").value = "";
    document.getElementById("inputNota4").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(valor) {
    //quando recebe valor == true no parâmetro, libera a chave e bloqueia a edição dos outros atributos. Se receber false, faz o contrário.
    document.getElementById("inputRa").readOnly = !valor; // sempre ao contrário dos outros atributos
    document.getElementById("inputNome").readOnly = valor;
    document.getElementById("inputNota1").readOnly = valor;
    document.getElementById("inputNota2").readOnly = valor;
    document.getElementById("inputNota3").readOnly = valor;
    document.getElementById("inputNota4").readOnly = valor;
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
    document.getElementById("inputRa").focus();
}

//backend
function inserirDadosIniciais() {
    //esta função é para não ter que ficar digitando dados a cada vez que 
    //recarrega a página. Facilita os testes. 

    listaAlunos = [];//se houver dados na lista, apaga todos
    let aluno = new Aluno('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaAlunos.push(aluno);
    aluno = new Aluno('222', 'Bruno Costa', 6.3, 5.8, 7.0, 6.5);
    listaAlunos.push(aluno);
    aluno = new Aluno('333', 'Carla Oliveira', 9.1, 8.7, 9.3, 8.9);
    listaAlunos.push(aluno);
    aluno = new Aluno('444', 'Daniel Souza', 7.5, 6.9, 8.0, 7.2);
    listaAlunos.push(aluno);
    aluno = new Aluno('555', 'Eduardo Lima', 5.6, 7.4, 6.5, 6.8);
    listaAlunos.push(aluno);
    aluno = new Aluno('666', 'Bruno Costa', 3.2, 5.1, 2.0, 1.5);
    listaAlunos.push(aluno);
    aluno = new Aluno('777', 'Bernadete Pereira da Costa Larga', 8, 8.1, 8.0, 9.5);
    listaAlunos.push(aluno);
    listar();
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}
