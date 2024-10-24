let listaCadeira = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let cadeira = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCadeira.length; i++) {
        const cadeira = listaCadeira[i];
        if (cadeira.numero == chave) {
            cadeira.posicaoNaLista = i;
            return listaCadeira[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const numero = document.getElementById("inputNumero").value;
    if (isNaN(numero) || !Number.isInteger(Number(numero))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputNumero").focus();
        return;
    }

    if (numero) { // se digitou um Numero
        cadeira = procurePorChavePrimaria(numero);
        if (cadeira) { //achou na lista
            mostrarDadosCadeira(cadeira);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputNumero").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputNumero").focus();

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

    let numero;
    if (cadeira == null) {
         numero = parseInt(document.getElementById("inputNumero").value);
    } else {
        numero = cadeira.numero;
    }

    const nome = document.getElementById("inputNome").value;
    const altura = parseFloat(document.getElementById("inputAltura").value);
    const peso = parseFloat(document.getElementById("inputPeso").value);
    const dataCriacao = document.getElementById("inputDataCriacao").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(numero && nome && altura && peso && dataCriacao ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                cadeira = new Cadeira(numero,nome,altura,peso,dataCriacao);
                listaCadeira.push(cadeira);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                cadeiraAlterado = new Cadeira(numero,nome,altura,peso,dataCriacao);
                listaCadeira[cadeira.posicaoNaLista] = cadeiraAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCadeira.length; i++) {
                    if (cadeira.posicaoNaLista != i) {
                        novaLista.push(listaCadeira[i]);
                    }
                }
                listaCadeira = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputNumero").focus();
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
            linha.numero+" - " +
            linha.nome+" - " +
            linha.altura+" - " +
            linha.peso+" - " +
            linha.dataCriacao+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCadeira);
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

// Função para mostrar os dados do Cadeira nos campos
function mostrarDadosCadeira(cadeira) {
    document.getElementById("inputNumero").value = cadeira.numero;
    document.getElementById("inputNome").value = cadeira.nome;
    document.getElementById("inputAltura").value = cadeira.altura;
    document.getElementById("inputPeso").value = cadeira.peso;
    document.getElementById("inputDataCriacao").value = cadeira.dataCriacao;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputAltura").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputDataCriacao").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputNumero").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputAltura").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputDataCriacao").readOnly = soLeitura;
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
    document.getElementById("inputNumero").focus();
}

