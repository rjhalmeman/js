let listaBicicleta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let bicicleta = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBicicleta.length; i++) {
        const bicicleta = listaBicicleta[i];
        if (bicicleta.id == chave) {
            bicicleta.posicaoNaLista = i;
            return listaBicicleta[i];
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
        bicicleta = procurePorChavePrimaria(id);
        if (bicicleta) { //achou na lista
            mostrarDadosBicicleta(bicicleta);
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
    if (bicicleta == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = bicicleta.id;
    }

    const nome = document.getElementById("input nome").value;
    const fabricante = document.getElementById("input fabricante").value;
    const dataDeLancamento = document.getElementById("input dataDeLancamento").value;
    const preco = parseFloat(document.getElementById("input preco").value);
    const peso = parseFloat(document.getElementById("inputPeso").value);
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && fabricante && dataDeLancamento && preco && peso) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                bicicleta = new Bicicleta(id, nome, fabricante, dataDeLancamento, preco, peso);
                listaBicicleta.push(bicicleta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                bicicletaAlterado = new Bicicleta(id, nome, fabricante, dataDeLancamento, preco, peso);
                listaBicicleta[bicicleta.posicaoNaLista] = bicicletaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBicicleta.length; i++) {
                    if (bicicleta.posicaoNaLista != i) {
                        novaLista.push(listaBicicleta[i]);
                    }
                }
                listaBicicleta = novaLista;
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
            linha.fabricante + " - " +
            linha.dataDeLancamento + " - " +
            linha.preco + " - " +
            linha.peso + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBicicleta);
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

// Função para mostrar os dados do Bicicleta nos campos
function mostrarDadosBicicleta(bicicleta) {
    document.getElementById("inputId").value = bicicleta.id;
    document.getElementById("input nome").value = bicicleta.nome;
    document.getElementById("input fabricante").value = bicicleta.fabricante;
    document.getElementById("input dataDeLancamento").value = bicicleta.dataDeLancamento;
    document.getElementById("input preco").value = bicicleta.preco;
    document.getElementById("inputPeso").value = bicicleta.peso;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("input nome").value = "";
    document.getElementById("input fabricante").value = "";
    document.getElementById("input dataDeLancamento").value = "";
    document.getElementById("input preco").value = "";
    document.getElementById("inputPeso").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("input nome").readOnly = soLeitura;
    document.getElementById("input fabricante").readOnly = soLeitura;
    document.getElementById("input dataDeLancamento").readOnly = soLeitura;
    document.getElementById("input preco").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
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

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function abrirArquivoSalvoEmLocalPermanente() {

    const input = document.createElement('input');
    //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
    input.onchange = function (event) {
        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
        O evento change é disparado quando um arquivo é selecionado*/
        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./Bicicleta.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaBicicleta.length; i++) {
        const linha = listaBicicleta[i]; //variavel linha contem as informações de cada bicicleta
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.fabricante + ";" +
            linha.dataDeLancamento + ";" +
            linha.preco + ";" +
            linha.peso + "\n"
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}


// Função para processar o arquivo CSV e transferir os dados para a listaBicicleta
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaBicicleta = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) { //verifica os seis campos
                    // Adiciona os dados à listaBicicleta como um objeto
                    listaBicicleta.push({
                        id: dados[0],
                        nome: dados[1],
                        fabricante: dados[2],
                        dataDeLancamento: dados[3],
                        preco: dados[4],
                        peso: dados[5]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}


function selecionarPorPeso() {
    const pesoInformado = parseFloat(document.getElementById("inputPesoInformado").value);
    let novaListaBicicleta = [];
    for (let i = 0; i < listaBicicleta.length; i++) {
        let bike = listaBicicleta[i];
        if (bike.peso < pesoInformado) {
            novaListaBicicleta.push(bike);
        }
    }
    novaListaBicicleta = preparaListagem(novaListaBicicleta);

    document.getElementById("outputSaida").innerHTML = novaListaBicicleta;

}


function bicicletasMaisBaratas() {
    let menorPreco = parseFloat(listaBicicleta[0].preco);
    for (let i = 1; i < listaBicicleta.length; i++) {
        const bike = listaBicicleta[i];
        if (parseFloat(bike.preco) < menorPreco) {
            menorPreco = bike.preco;
        }
    }
    let novaListaBicicleta = [];
    for (let i = 0; i < listaBicicleta.length; i++) {
        const bike = listaBicicleta[i];
        if (bike.preco == menorPreco) {
            novaListaBicicleta.push(bike);
        }
    }
    novaListaBicicleta = preparaListagem(novaListaBicicleta);

    document.getElementById("outputSaida").innerHTML = novaListaBicicleta;
}