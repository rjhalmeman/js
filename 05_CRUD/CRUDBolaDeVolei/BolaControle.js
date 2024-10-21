let listaBola = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let bola = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBola.length; i++) {
        const bola = listaBola[i];
        if (bola.id == chave) {
            bola.posicaoNaLista = i;
            return listaBola[i];
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
        bola = procurePorChavePrimaria(id);
        if (bola) { //achou na lista
            mostrarDadosBola(bola);
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
    if (bola == null) {
         id = parseInt(document.getElementById("inputId").value);
    } else {
        id = bola.id;
    }

    const peso = parseInt(document.getElementById("inputPeso").value);
    const modelo = document.getElementById("inputModelo").value;
    const marca = document.getElementById("inputMarca").value;
    const dataFabricacao = document.getElementById("inputDataFabricacao").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(id && peso && modelo && marca && dataFabricacao ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                bola = new Bola(id,peso,modelo,marca,dataFabricacao);
                listaBola.push(bola);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                bolaAlterado = new Bola(id,peso,modelo,marca,dataFabricacao);
                listaBola[bola.posicaoNaLista] = bolaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBola.length; i++) {
                    if (bola.posicaoNaLista != i) {
                        novaLista.push(listaBola[i]);
                    }
                }
                listaBola = novaLista;
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
            linha.peso+" - " +
            linha.modelo+" - " +
            linha.marca+" - " +
            linha.dataFabricacao+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBola);
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

// Função para mostrar os dados do Bola nos campos
function mostrarDadosBola(bola) {
    document.getElementById("inputId").value = bola.id;
    document.getElementById("inputPeso").value = bola.peso;
    document.getElementById("inputModelo").value = bola.modelo;
    document.getElementById("inputMarca").value = bola.marca;
    document.getElementById("inputDataFabricacao").value = bola.dataFabricacao;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputMarca").value = "";
    document.getElementById("inputDataFabricacao").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
    document.getElementById("inputMarca").readOnly = soLeitura;
    document.getElementById("inputDataFabricacao").readOnly = soLeitura;
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

