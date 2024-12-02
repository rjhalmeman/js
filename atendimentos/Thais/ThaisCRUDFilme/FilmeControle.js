let listaFilme = [];
let oQueEstaFazendo = '';
let filme = null;
bloquearAtributos(true);
let antiEmily = 0;

//dadosIniciais();

function dadosIniciais() {
    listaFilme.push(new Filme('0', 'As Branquelas', 'Comédia', '2004-08-27', '109', 'Wayans Brothers Entertainment', 'Keenen Ivory Wayans', 'trailers/trailer_as_branquelas.mp4'));
    listaFilme.push(new Filme('1', 'It - A Coisa', 'Terror', '2017-09-07', '135', 'Rideback', 'Andy Muschietti', 'trailers/trailer_it_a_coisa.mp4'));
    listaFilme.push(new Filme('2', 'Como Perder um Homem em 10 Dias', 'Comédia romântica', '2003-01-27', '116', 'Paramount Pictures', 'Donald Petrie', 'trailers/trailer_como_perder_um_homem_em_dez_dias.mp4'));
    listaFilme.push(new Filme('3', 'Velozes e Furiosos', 'Ação', '2001-09-28', '106', 'Universal Studios', 'Rob Cohen', 'trailers/trailer_velozes_e_furiosos.mp4'));
    listaFilme.push(new Filme('4', 'Um Sonho de Liberdade', 'Drama', '1995-03-17', '142', 'Castle Rock Entertainment', 'Frank Darabont', 'trailers/trailer_um_sonho_de_liberdade.mp4'));
    listaFilme.push(new Filme('5', 'Interestelar', 'Ficção científica', '2014-11-06', '169', 'Paramount Pictures', 'Christopher Nolan', 'trailers/trailer_interestelar.mp4'));
    listaFilme.push(new Filme('6', 'Shrek', 'Animação', '2001-07-22', '89', 'DreamWorks Animation', 'Dennis Dugan', 'trailers/trailer_shrek.mp4'));

    listar();
}


function salvarNoComputador() {
    nomeParaSalvar = "./Filme.csv";
    let textoCSV = "";
    for (let i = 0; i < listaFilme.length; i++) {
        const linha = listaFilme[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.genero + ";" +
            linha.dataLancamento + ";" +
            linha.duracao + ";" +
            linha.estudio + ";" +
            linha.diretor + "\n";
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
function buscarDadosSalvosNoComputador() {
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

// Função para processar o arquivo CSV e transferir os dados para a listaFilme
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaFilme = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'                
                if (dados.length === 8) {
                    // Adiciona os dados à listaFilme como um objeto
                    listaFilme.push({
                        id: dados[0],
                        nome: dados[1],
                        genero: dados[2],
                        dataLancamento: dados[3],
                        duracao: dados[4],
                        estudio: dados[5],
                        diretor: dados[6],
                    });
                }
            }
        }
        //console.log("Upload concluído!", listaFilme); // Exibe no console a lista atualizada
        listar();
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}


function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaFilme.length; i++) {
        const filme = listaFilme[i];
        if (filme.id == chave) {
            filme.posicaoNaLista = i;
            return listaFilme[i];
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
        filme = procurePorChavePrimaria(id);
        if (filme) { //encontrou
            mostrarDadosFilme(filme);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else {
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
            antiEmily = id;
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
    if (filme == null) {
        id = parseInt(document.getElementById("id").value);
    } else {
        id = filme.id;
    }

    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const dataLancamento = document.getElementById("dataLancamento").value;
    const duracao = document.getElementById("duracao").value;
    const estudio = document.getElementById("estudio").value;
    const diretor = document.getElementById("diretor").value;

    if (id && nome && genero && dataLancamento && duracao && estudio && diretor) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                filme = new Filme(id, nome, genero, dataLancamento, duracao, estudio, diretor);
                listaFilme.push(filme);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                filmeAlterado = new Filme(id, nome, genero, dataLancamento, duracao, estudio, diretor);
                listaFilme[filme.posicaoNaLista] = filmeAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaFilme.length; i++) {
                    if (filme.posicaoNaLista != i) {
                        novaLista.push(listaFilme[i]);
                    }
                }
                listaFilme = novaLista;
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
            linha.genero + " - " +
            linha.dataLancamento + " - " +
            linha.duracao + " - " +
            linha.estudio + " - " +
            linha.diretor + "<br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaFilme);
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

function mostrarDadosFilme(filme) {
    document.getElementById("id").value = filme.id;
    document.getElementById("nome").value = filme.nome;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("dataLancamento").value = filme.dataLancamento;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("estudio").value = filme.estudio;
    document.getElementById("diretor").value = filme.diretor;

    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("dataLancamento").value = "";
    document.getElementById("duracao").value = "";
    document.getElementById("estudio").value = "";
    document.getElementById("diretor").value = "";
    

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("genero").readOnly = soLeitura;
    document.getElementById("dataLancamento").readOnly = soLeitura;
    document.getElementById("duracao").readOnly = soLeitura;
    document.getElementById("estudio").readOnly = soLeitura;
    document.getElementById("diretor").readOnly = soLeitura;
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