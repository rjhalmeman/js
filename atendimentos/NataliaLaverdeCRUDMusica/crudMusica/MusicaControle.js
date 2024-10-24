
let listaMusica = [];
let oQueEstaFazendo = '';
let musica = null;
bloquearAtributos(true);


//dadosIniciais();

function dadosIniciais() {
    listaMusica.push(new Musica('0', 'Rein raus', 'Rammstein', 'Mutter', '2001-02-04', 'Industrial Metal'));
    listaMusica.push(new Musica('1', 'I-E-A-I-A-I-O', 'System Of A Down', 'Steal This Album!', '2002-11-26', 'Nu Metal'));
    listaMusica.push(new Musica('2', 'Diamond Eyes', 'Deftones', 'Diamond Eyes', '2010-05-04', 'Alternative Metal'));
    listaMusica.push(new Musica('3', 'The Unforgiven II', 'Metallica', 'Reload', '1997-01-01', 'Rock'));
    listaMusica.push(new Musica('4', 'Otherside', 'RHCP', 'Californication', '1999-01-01', 'Rock'));
    listaMusica.push(new Musica('5', 'Wind Of Change', 'Scorpions', 'Crazy World', '1990-01-01', 'Rock'));
    listaMusica.push(new Musica('6', 'Fazer Falta', 'Mc Livinho', 'Fazer Falta', '2017-05-25', 'Funk Paulista'));

    listar();
}


function fazerDownload() {
    nomeParaSalvar = "./Musica.csv";
    let textoCSV = "";
    for (let i = 0; i < listaMusica.length; i++) {
        const linha = listaMusica[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.banda + ";" +
            linha.album + ";" +
            linha.lancamento + ";" +
            linha.genero + "\n";
    }


    salvarEmArquivo(nomeParaSalvar, textoCSV);
}


function salvarEmArquivo(nomeArq, conteudo) {
    // Cria um blob com o conteúdo em formato de texto
    const blob = new Blob([conteudo], { type: 'text/plain' });
    // Cria um link temporário para o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download
    // Simula o clique no link para iniciar o download
    link.click();
    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
}


// Função para abrir o seletor de arquivos para upload
function fazerUpload() {
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            processarArquivo(arquivo);
        }
    };
    input.click(); // Simula o clique para abrir o seletor de arquivos
    
}

// Função para processar o arquivo CSV e transferir os dados para a listaMusica
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaMusica = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) {
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
       // console.log("Upload concluído!", listaMusica); // Exibe no console a lista atualizada
        listar();
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
