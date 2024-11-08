
let listaMusica = [];
let oQueEstaFazendo = '';
let musica = null;
bloquearAtributos(true);


function dadosIniciais() { //dados iniciais da lista
    listaMusica.push(new Musica('0', 'Rein raus', 'Rammstein', 'Mutter', '2001-02-04', 'Industrial Metal'));
    listaMusica.push(new Musica('1', 'I-E-A-I-A-I-O', 'System Of A Down', 'Steal This Album!', '2002-11-26', 'Nu Metal'));
    listaMusica.push(new Musica('2', 'Diamond Eyes', 'Deftones', 'Diamond Eyes', '2010-05-04', 'Alternative Metal'));
    listaMusica.push(new Musica('3', 'The Unforgiven II', 'Metallica', 'Reload', '1997-01-01', 'Rock'));
    listaMusica.push(new Musica('4', 'Otherside', 'RHCP', 'Californication', '1999-01-01', 'Rock'));
    listaMusica.push(new Musica('5', 'Wind Of Change', 'Scorpions', 'Crazy World', '1990-01-01', 'Rock'));
    listaMusica.push(new Musica('6', 'Fazer Falta', 'Mc Livinho', 'Fazer Falta', '2017-05-25', 'Funk Paulista'));
    listar();
}


function fazerDownload() { //gera um arquivo csv com as informações de listaMusica
    nomeParaSalvar = "./Musica.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaMusica.length; i++) {
        const linha = listaMusica[i]; //variavel linha contem as informações de cada musica
        textoCSV += linha.id + ";" + //concatena os dados das musicas formatados para linha csv (separada por ;)
            linha.nome + ";" +
            linha.banda + ";" +
            linha.album + ";" +
            linha.lancamento + ";" +
            linha.genero + "\n";
    }


    salvarEmArquivo(nomeParaSalvar, textoCSV);
}


function salvarEmArquivo(nomeArq, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function fazerUpload() {
    
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
            processarArquivo(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente
    
}


// Função para processar o arquivo CSV e transferir os dados para a listaMusica
function processarArquivo(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaMusica = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) { //verifica os seis campos
                    // Adiciona os dados à listaMusica como um objeto
                    listaMusica.push({
                        id: dados[0],
                        nome: dados[1],
                        banda: dados[2],
                        album: dados[3],
                        lancamento: dados[4],
                        genero: dados[5]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}



function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaMusica.length; i++) {
        const musica = listaMusica[i];
        if (musica.id == chave) {
            musica.posicaoNaLista = i;
            return listaMusica[i];
        }
    }
    return null;
}

function procure() {
    const id = document.getElementById("id").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("id").focus();
        return;
    }

    if (id) {
        musica = procurePorChavePrimaria(id);
        if (musica) { //encontrou
            mostrarDadosMusica(musica);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else {
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("id").focus();
        return;
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("id").focus();

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
    if (musica == null) {
        id = parseInt(document.getElementById("id").value);
    } else {
        id = musica.id;
    }

    const nome = document.getElementById("nome").value;
    const banda = document.getElementById("banda").value;
    const album = document.getElementById("album").value;
    const lancamento = document.getElementById("lancamento").value;
    const genero = document.getElementById("genero").value;

    if (id && nome && banda && album && lancamento && genero) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                musica = new Musica(id, nome, banda, album, lancamento, genero);
                listaMusica.push(musica);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                musicaAlterado = new Musica(id, nome, banda, album, lancamento, genero);
                listaMusica[musica.posicaoNaLista] = musicaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaMusica.length; i++) {
                    if (musica.posicaoNaLista != i) {
                        novaLista.push(listaMusica[i]);
                    }
                }
                listaMusica = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("id").focus();
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
            linha.banda + " - " +
            linha.album + " - " +
            linha.lancamento + " - " +
            linha.genero + "<br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaMusica);
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

function mostrarDadosMusica(musica) {
    document.getElementById("id").value = musica.id;
    document.getElementById("nome").value = musica.nome;
    document.getElementById("banda").value = musica.banda;
    document.getElementById("album").value = musica.album;
    document.getElementById("lancamento").value = musica.lancamento;
    document.getElementById("genero").value = musica.genero;

    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("banda").value = "";
    document.getElementById("album").value = "";
    document.getElementById("lancamento").value = "";
    document.getElementById("genero").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("banda").readOnly = soLeitura;
    document.getElementById("album").readOnly = soLeitura;
    document.getElementById("lancamento").readOnly = soLeitura;
    document.getElementById("genero").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("id").focus();
}
