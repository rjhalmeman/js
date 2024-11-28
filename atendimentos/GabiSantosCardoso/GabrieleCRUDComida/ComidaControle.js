let listaComida = []; 
let oQueEstaFazendo = ''; 
let comida = null;  
let antiEmilly = 0;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaComida.length; i++) {
        const comida = listaComida[i];
        if (comida.id == chave) {
            comida.posicaoNaLista = i;
            return listaComida[i];
        }
    }
    return null;
}

function procure() {
    const id = document.getElementById("inputId").value;
    antiEmilly = id;
    if (id) { 
        comida = procurePorChavePrimaria(id);
        if (comida) {
            mostrarDadosComida(comida);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); 
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { 
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
            
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();
    document.getElementById("inputId").value = antiEmilly;

}
function alterar() {

    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    let id;
    if (comida == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = comida.id;
    }

    const nome = document.getElementById("inputNome").value;
    const dtfab = document.getElementById("inputFab").value;
    const peso = parseInt(document.getElementById("inputPeso").value);
    const dtval = document.getElementById("inputVal").value;
    const tipo = document.getElementById("inputTipo").value;
    if (id && nome && dtfab && peso && dtval && tipo) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                comida = new Comida(id, nome, dtfab, peso, dtval, tipo);
                listaComida.push(comida);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                comidaAlterado = new Comida(id, nome, dtfab, peso, dtval, tipo);
                listaComida[comida.posicaoNaLista] = comidaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaComida.length; i++) {
                    if (comida.posicaoNaLista != i) {
                        novaLista.push(listaComida[i]);
                    }
                }
                listaComida = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
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
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.dtfab + " - " +
            linha.peso + " - " +
            linha.dtval + " - " +
            linha.tipo + "<br>";
    }
    return texto;
}
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaComida);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}
function mostrarDadosComida(comida) {
    document.getElementById("inputId").value = comida.id;
    document.getElementById("inputNome").value = comida.nome;
    document.getElementById("inputFab").value = comida.dtfab;
    document.getElementById("inputPeso").value = comida.peso;
    document.getElementById("inputVal").value = comida.dtval;
    document.getElementById("inputTipo").value = comida.tipo;

    bloquearAtributos(true);
}
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputFab").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputVal").value = "";
    document.getElementById("inputTipo").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputFab").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputVal").readOnly = soLeitura;
    document.getElementById("inputTipo").readOnly = soLeitura;
}
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; 
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
    let nomeDoArquivoDestino = "./Comida.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaComida.length; i++) {
        const linha = listaComida[i]; //variavel linha contem as informações de cada pizza
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.dtfab + ";" +
            linha.peso + ";" +
            linha.dtval + ";" +
            linha.tipo+"\n"
    }
    //id,nome,dtfab,peso,dtval,tipo,
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}


// Função para processar o arquivo CSV e transferir os dados para a listaPizza
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaPizza = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) { //verifica os seis campos
                    // Adiciona os dados à listaPizza como um objeto
                    listaComida.push({
                        id: dados[0],
                        nome: dados[1],
                        dtfab: dados[2],
                        peso: dados[3],
                        dtval: dados[4],
                        tipo: dados[5]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}

