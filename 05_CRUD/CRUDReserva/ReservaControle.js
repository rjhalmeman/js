let listaReserva = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let reserva = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaReserva.length; i++) {
        const reserva = listaReserva[i];
        if (reserva.codigoReserva == chave) {
            reserva.posicaoNaLista = i;
            return listaReserva[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const codigoReserva = document.getElementById("inputCodigoReserva").value;
    if (codigoReserva) { // se digitou um CodigoReserva
        reserva = procurePorChavePrimaria(codigoReserva);
        if (reserva) { //achou na lista
            mostrarDadosReserva(reserva);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputCodigoReserva").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputCodigoReserva").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
    document.getElementById("outputDiarias").value = "";
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

    let codigoReserva;
    if (reserva == null) {
        codigoReserva = document.getElementById("inputCodigoReserva").value;
    } else {
        codigoReserva = reserva.codigoReserva;
    }

    const dataCheckin = document.getElementById("inputDataCheckin").value;
    const dataCheckout = document.getElementById("inputDataCheckout").value;
    const cliente = document.getElementById("inputCliente").value;
    const quarto = document.getElementById("inputQuarto").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (codigoReserva && dataCheckin && dataCheckout && cliente && quarto) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                reserva = new Reserva(codigoReserva, dataCheckin, dataCheckout, cliente, quarto);
                listaReserva.push(reserva);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                reservaAlterado = new Reserva(codigoReserva, dataCheckin, dataCheckout, cliente, quarto);
                listaReserva[reserva.posicaoNaLista] = reservaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaReserva.length; i++) {
                    if (reserva.posicaoNaLista != i) {
                        novaLista.push(listaReserva[i]);
                    }
                }
                listaReserva = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputCodigoReserva").focus();
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
            linha.codigoReserva + " - " +
            linha.dataCheckin + " - " +
            linha.dataCheckout + " - " +
            linha.cliente + " - " +
            linha.quarto + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaReserva);
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

// Função para mostrar os dados do Reserva nos campos
function mostrarDadosReserva(reserva) {
    document.getElementById("inputCodigoReserva").value = reserva.codigoReserva;
    document.getElementById("inputDataCheckin").value = reserva.dataCheckin;
    document.getElementById("inputDataCheckout").value = reserva.dataCheckout;

    // Converte as datas para objetos Date
    const dataCheckin = new Date(reserva.dataCheckin);
    const dataCheckout = new Date(reserva.dataCheckout);

    // Calcula a quantidade de diárias
    //1000 * 60 * 60 * 24 é o número de milissegundos em um dia.
    //Math.ceil arredonda para cima para garantir que qualquer parte de um dia seja contada como uma diária completa.
    const diarias = Math.ceil((dataCheckout - dataCheckin) / (1000 * 60 * 60 * 24)); // 1000 milisegundos * 60 segundos * 60 minutos * 24 horas

    // Mostra a quantidade de diárias no campo 
    document.getElementById("outputDiarias").value = diarias;

    document.getElementById("inputCliente").value = reserva.cliente;
    document.getElementById("inputQuarto").value = reserva.quarto;

    // Define os campos como readonly
    bloquearAtributos(true);
}


// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputDataCheckin").value = "";
    document.getElementById("inputDataCheckout").value = "";
    document.getElementById("inputCliente").value = "";
    document.getElementById("inputQuarto").value = "";
    document.getElementById("outputDiarias").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputCodigoReserva").readOnly = !soLeitura;
    document.getElementById("inputDataCheckin").readOnly = soLeitura;
    document.getElementById("inputDataCheckout").readOnly = soLeitura;
    document.getElementById("inputCliente").readOnly = soLeitura;
    document.getElementById("inputQuarto").readOnly = soLeitura;
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
    document.getElementById("inputCodigoReserva").focus();
}

