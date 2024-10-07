let listaAlunos = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let aluno = null; //variavel global 

window.onload = inserirDadosIniciais();

//metodo para mostrar mensagem quando estiver na chave primaria
document.getElementById("inputRa").addEventListener("focus", function () {
    document.getElementById("divAviso").innerHTML = "Digite o RA e clic no botão procure";
});

//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.ra == chave) {
            aluno.posicaoNaLista = i;
            return listaAlunos[i];
        }
    }
    return null;//não achou
}

//backend
function listar(vetor) {
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
function listarDados() {
    document.getElementById("outputSaida").innerHTML = listar(listaAlunos);
}

// Função para procurar um aluno pelo RA -------------------------------------------------------------
function procure() {

    const ra = document.getElementById("inputRa").value;
    if (ra) { // se digitou um Ra
        aluno = procurePorChavePrimaria(ra);

        if (aluno) { //achou na lista
            mostrarDadosAluno(aluno);
            habilitarBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            document.getElementById("divAviso").innerHTML = "Achou na lista, pode alterar ou excluir";
        } else { //não achou na lista
            limparDados();
            habilitarBotoes('inline', 'inline', 'none', 'none', 'none');
            document.getElementById("divAviso").innerHTML = "Não achou na lista, pode inserir";
        }
    } else {
        document.getElementById("inputRa").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    // Remove o readonly dos campos
    liberarEdicaoDaChaveOuAtributos(true);


    habilitarBotoes('none', 'none', 'none', 'none', 'inline'); //habilitarBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'inserindo';

    document.getElementById("divAviso").innerHTML = "INSERINDO - Digite os atributos e clic o botão salvar";
    document.getElementById("inputRa").focus();

    //para facilitar os testes sem ter que digitar notas (vai sumir quando terminarem os testes)
    document.getElementById("inputNota1").value = 7;
    document.getElementById("inputNota2").value = 7;
    document.getElementById("inputNota3").value = 7;
    document.getElementById("inputNota4").value = 7;
}

// Função para alterar os dados de um aluno
function alterar() {

    // console.log(aluno.nome + " - " + aluno.posicaoNaLista);
    // Remove o readonly dos campos
    liberarEdicaoDaChaveOuAtributos(true);

    habilitarBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    document.getElementById("divAviso").innerHTML = "ALTERANDO - Digite os atributos e clic o botão salvar";
}

// Função para excluir um aluno
function excluir() {
    liberarEdicaoDaChaveOuAtributos(true);
    habilitarBotoes('none', 'none', 'none', 'none', 'inline'); //habilitarBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    document.getElementById("divAviso").innerHTML = "EXCLUINDO - clic o botão salvar para confirmar a exclusão";
}


function salvarAluno() {
    //inserir na lista os dados que o usuário digitou
    const ra = document.getElementById("inputRa").value;
    const nome = document.getElementById("inputNome").value;

    let nota1 = parseFloat(document.getElementById("inputNota1").value);
    let nota2 = parseFloat(document.getElementById("inputNota2").value);
    let nota3 = parseFloat(document.getElementById("inputNota3").value);
    let nota4 = parseFloat(document.getElementById("inputNota4").value);

    //verificar o que foi digitado pelo USUÁRIO
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
                document.getElementById("divAviso").innerHTML = "Inserido na lista";
                break;

            case 'alterando':
                alunoAlterado = new Aluno(ra, nome, nota1, nota2, nota3, nota4);
                listaAlunos[aluno.posicaoNaLista] = alunoAlterado;
                document.getElementById("divAviso").innerHTML = "Alterado";
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaAlunos.length; i++) {
                    if (aluno.posicaoNaLista != i) {
                        novaLista.push(listaAlunos[i]);
                    }
                }
                listaAlunos = novaLista;
                document.getElementById("divAviso").innerHTML = "EXCLUIDO";
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                document.getElementById("divAviso").innerHTML = "" + oQueEstaFazendo;
        }
        habilitarBotoes('inline', 'none', 'none', 'none', 'none');
        limparDados();
        listarDados();
        document.getElementById("inputRa").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

function cancelarOperacao() {
    limparDados();
    bloquearAtributos(true);
    habilitarBotoes('inline', 'none', 'none', 'none', 'none');
    document.getElementById("divAviso").innerHTML = "Cancelou a operação de edição";
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
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputRa").readOnly = soLeitura;
    document.getElementById("inputNome").readOnly = !soLeitura;
    document.getElementById("inputNota1").readOnly = !soLeitura;
    document.getElementById("inputNota2").readOnly = !soLeitura;
    document.getElementById("inputNota3").readOnly = !soLeitura;
    document.getElementById("inputNota4").readOnly = !soLeitura;
}

// Função para limpar os dados
function limparDados() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputNota1").value = "";
    document.getElementById("inputNota2").value = "";
    document.getElementById("inputNota3").value = "";
    document.getElementById("inputNota4").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(valor) {
    // Remove o readonly dos campos
    document.getElementById("inputRa").readOnly = !valor; // sempre ao contrário dos outros atributos
    document.getElementById("inputNome").readOnly = valor;
    document.getElementById("inputNota1").readOnly = valor;
    document.getElementById("inputNota2").readOnly = valor;
    document.getElementById("inputNota3").readOnly = valor;
    document.getElementById("inputNota4").readOnly = valor;
}

// Função para habilitar ou desabilitar botões
function habilitarBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {

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

    listarDados();

    habilitarBotoes('inline', 'none', 'none', 'none', 'none');
    bloquearAtributos(true);
}
