let listaPelucia = [];
let oQueEstaFazendo = '';
let pelucias = null;
bloquearAtributos(true);


//dadosIniciais();

function dadosIniciais() {
    listaPelucia.push(new Pelucia('1', 'Youk', 'Urso', '110.00', '2023-12-23', 'Gustavo'));
    listaPelucia.push(new Pelucia('2', 'Tina', 'Coelho', '98.00', '2024-03-31', 'Anna'));
    listaPelucia.push(new Pelucia('3', 'Ubbie', 'Urso', '79.99', '2024-06-12', 'Lais'));
    listaPelucia.push(new Pelucia('4', 'Luck', 'Cachorro', '82.76', '2021-01-08', 'Miguel'));
    listaPelucia.push(new Pelucia('5', 'Wally', 'Galinha', '102.25', '2012-06-23', 'Alicia'));
    listaPelucia.push(new Pelucia('6', 'Mike', 'Panda', '167.00', '2017-05-25', 'Ravi'));
    listaPelucia.push(new Pelucia('7', 'Bart', 'Pato', '121.72', '2022-07-03', 'Luara'));
    listaPelucia.push(new Pelucia('8', 'Lina', 'Pinguim', '92.99', '2020-11-08', 'Gael'));
    listaPelucia.push(new Pelucia('9', 'Joe', 'Rena', '88.50', '2009-02-04', 'Helena'));
    listaPelucia.push(new Pelucia('10', 'Zara', 'Zebra', '200.75', '2018-10-10', 'Maria'));


    listar();
}


function salvarNoComputador() {
    nomeParaSalvar = "./Pelucias.csv";
    let textoCSV = "";
    for (let i = 0; i < listaPelucia.length; i++) {
        const linha = listaPelucia[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.formato + ";" +
            linha.preco + ";" +
            linha.lancamento + ";" +
            linha.comprador + "\n";
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

function processarArquivo(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaPelucia = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) { //verifica os seis campos
                    // Adiciona os dados à listaMusica como um objeto
                    listaPelucia.push({
                        id: dados[0],
                        nome: dados[1],
                        formato: dados[2],
                        preco: dados[3],
                        lancamento: dados[4],
                        comprador: dados[5]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}

function gerarCertificado() {
    if (!pelucias) {
        alert("Nenhuma pelúcia selecionada para gerar o certificado.");
        return;
    }

    console.log(pelucias);

    // Atualizar os dados no certificado
    document.getElementById("certNome").textContent = pelucias.nome;
    document.getElementById("certFormato").textContent = pelucias.formato;
    document.getElementById("certComprador").textContent = pelucias.comprador;
    document.getElementById("certLancamento").textContent = pelucias.lancamento;

    // Exibir o certificado
    const certificado = document.getElementById("certificado");
    certificado.style.display = "block";

    // Criar a funcionalidade de salvar como imagem
    html2canvas(certificado).then((canvas) => {
        const link = document.createElement("a");
        link.download = `certificado_pelucia_${pelucias.nome}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}


// Função para processar o arquivo CSV e transferir os dados para a listaPelucia
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaPelucia = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) {
                    // Adiciona os dados à listaPelucia como um objeto
                    listaPelucia.push({
                        id: dados[0],
                        nome: dados[1],
                        formato: dados[2],
                        preco: dados[3],
                        lancamento: dados[4],
                        comprador: dados[5]
                    });
                }
            }
        }
        // console.log("Upload concluído!", listaPelucia); // Exibe no console a lista atualizada
        listar();
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}


function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaPelucia.length; i++) {
        const pelucias = listaPelucia[i];
        if (pelucias.id == chave) {
            pelucias.posicaoNaLista = i;
            return listaPelucia[i];
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
        pelucias = procurePorChavePrimaria(id);
        if (pelucias) { //encontrou
            mostrarDadospelucias(pelucias);
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
    if (pelucias == null) {
        id = parseInt(document.getElementById("id").value);
    } else {
        id = pelucias.id;
    }

    const nome = document.getElementById("nome").value;
    const formato = document.getElementById("formato").value;
    const preco = parseFloat(document.getElementById("preco").value).toFixed(2);
    const lancamento = document.getElementById("lancamento").value;
    const comprador = document.getElementById("comprador").value;

    if (id && nome && formato && preco && lancamento && comprador) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                pelucias = new Pelucia(id, nome, formato, preco, lancamento, comprador);
                listaPelucia.push(pelucias);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                peluciasAlterado = new Pelucia(id, nome, formato, preco, lancamento, comprador);
                listaPelucia[pelucias.posicaoNaLista] = peluciasAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaPelucia.length; i++) {
                    if (pelucias.posicaoNaLista != i) {
                        novaLista.push(listaPelucia[i]);
                    }
                }
                listaPelucia = novaLista;
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
            linha.formato + " - " +
            linha.preco + " - " +
            linha.lancamento + " - " +
            linha.comprador + "<br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaPelucia);
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

function mostrarDadospelucias(pelucias) {
    document.getElementById("id").value = pelucias.id;
    document.getElementById("nome").value = pelucias.nome;
    document.getElementById("formato").value = pelucias.formato;
    document.getElementById("preco").value = pelucias.preco;
    document.getElementById("lancamento").value = pelucias.lancamento;
    document.getElementById("comprador").value = pelucias.comprador;

    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("formato").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("lancamento").value = "";
    document.getElementById("comprador").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("formato").readOnly = soLeitura;
    document.getElementById("preco").readOnly = soLeitura;
    document.getElementById("lancamento").readOnly = soLeitura;
    document.getElementById("comprador").readOnly = soLeitura;
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