let listaConsumoAgua = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let consumoAgua = null; //variavel global


window.onload = dadosIniciais();
function dadosIniciais() {
    listaConsumoAgua.push(new ConsumoAgua('111', 'Maria Sofredora das Dores', 15, 10, 13, 22, 17, 21));
    listaConsumoAgua.push(new ConsumoAgua('222', 'José Reclamildo', 25, 15, 13, 20, 19, 18));
    listaConsumoAgua.push(new ConsumoAgua('333', 'Carlos dos Santos', 10, 10, 11, 9, 9, 11));
    listaConsumoAgua.push(new ConsumoAgua('444', 'Mario Contrarius', 18, 19, 17, 15, 17, 21));
    listaConsumoAgua.push(new ConsumoAgua('555', 'Cledhisley Hamilton Pereira', 25, 20, 32, 32, 33, 29));
    listar();
}



bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const consumoAgua = listaConsumoAgua[i];
        if (consumoAgua.cpf == chave) {
            consumoAgua.posicaoNaLista = i;
            return listaConsumoAgua[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const cpf = document.getElementById("inputCpf").value;
    if (cpf) { // se digitou um Cpf
        consumoAgua = procurePorChavePrimaria(cpf);
        if (consumoAgua) { //achou na lista
            mostrarDadosConsumoAgua(consumoAgua);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputCpf").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputCpf").focus();

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

    let cpf;
    if (consumoAgua == null) {
        cpf = document.getElementById("inputCpf").value;
    } else {
        cpf = consumoAgua.cpf;
    }

    const nome = document.getElementById("inputNome").value;
    const mes1 = parseFloat(document.getElementById("inputMes1").value);
    const mes2 = parseFloat(document.getElementById("inputMes2").value);
    const mes3 = parseFloat(document.getElementById("inputMes3").value);
    const mes4 = parseFloat(document.getElementById("inputMes4").value);
    const mes5 = parseFloat(document.getElementById("inputMes5").value);
    const mes6 = parseFloat(document.getElementById("inputMes6").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (cpf && nome && mes1 && mes2 && mes3 && mes4 && mes5 && mes6) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                consumoAgua = new ConsumoAgua(cpf, nome, mes1, mes2, mes3, mes4, mes5, mes6);
                listaConsumoAgua.push(consumoAgua);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                consumoAguaAlterado = new ConsumoAgua(cpf, nome, mes1, mes2, mes3, mes4, mes5, mes6);
                listaConsumoAgua[consumoAgua.posicaoNaLista] = consumoAguaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaConsumoAgua.length; i++) {
                    if (consumoAgua.posicaoNaLista != i) {
                        novaLista.push(listaConsumoAgua[i]);
                    }
                }
                listaConsumoAgua = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputCpf").focus();
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
            linha.cpf + " - " +
            linha.nome + " - " +
            linha.mes1 + " - " +
            linha.mes2 + " - " +
            linha.mes3 + " - " +
            linha.mes4 + " - " +
            linha.mes5 + " - " +
            linha.mes6 + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaConsumoAgua);
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

// Função para mostrar os dados do ConsumoAgua nos campos
function mostrarDadosConsumoAgua(consumoAgua) {
    document.getElementById("inputCpf").value = consumoAgua.cpf;
    document.getElementById("inputNome").value = consumoAgua.nome;
    document.getElementById("inputMes1").value = consumoAgua.mes1;
    document.getElementById("inputMes2").value = consumoAgua.mes2;
    document.getElementById("inputMes3").value = consumoAgua.mes3;
    document.getElementById("inputMes4").value = consumoAgua.mes4;
    document.getElementById("inputMes5").value = consumoAgua.mes5;
    document.getElementById("inputMes6").value = consumoAgua.mes6;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputMes1").value = "";
    document.getElementById("inputMes2").value = "";
    document.getElementById("inputMes3").value = "";
    document.getElementById("inputMes4").value = "";
    document.getElementById("inputMes5").value = "";
    document.getElementById("inputMes6").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputCpf").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputMes1").readOnly = soLeitura;
    document.getElementById("inputMes2").readOnly = soLeitura;
    document.getElementById("inputMes3").readOnly = soLeitura;
    document.getElementById("inputMes4").readOnly = soLeitura;
    document.getElementById("inputMes5").readOnly = soLeitura;
    document.getElementById("inputMes6").readOnly = soLeitura;
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
    document.getElementById("inputCpf").focus();
}

function totalDeAguaConsumida() {
    let soma = 0;
    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const cadaPessoa = listaConsumoAgua[i];
        soma += cadaPessoa.mes1 + cadaPessoa.mes2 + cadaPessoa.mes3 + cadaPessoa.mes4 + cadaPessoa.mes5 + cadaPessoa.mes6;
    }
    document.getElementById("consumoTotal").innerText = " >>> " + soma + " metros cúbicos";
}

function mediaDeConsumoPorPessoa() {
    let texto = "";
    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const linha = listaConsumoAgua[i];
        let media = (linha.mes1 + linha.mes2 + linha.mes3 + linha.mes4 + linha.mes5 + linha.mes6) / 6;
        texto +=
            linha.cpf + " - " +
            linha.nome + " - " +
            linha.mes1 + " - " +
            linha.mes2 + " - " +
            linha.mes3 + " - " +
            linha.mes4 + " - " +
            linha.mes5 + " - " +
            linha.mes6 + " - " +
            media.toFixed(1) + "<br>";
    }
    document.getElementById("outputSaida").innerHTML = texto;
}


function maiorConsumoRegistrado() {
    let gastoes = [];
    let maiorConsumo = 0;
    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const linha = listaConsumoAgua[i];
        if (linha.mes1 > maiorConsumo) {
            maiorConsumo = linha.mes1;
        }
    }

    for (let i = 0; i < listaConsumoAgua.length; i++) {
        const linha = listaConsumoAgua[i];
        if (linha.mes1 == maiorConsumo) {
            gastoes.push(linha);
        }
    }

    let gg = preparaListagem(gastoes);
    document.getElementById("outputSaida").innerHTML = gg;
}


