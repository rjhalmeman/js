let listaFlor = [];
let oQueEstaFazendo = '';
let flor = null;
bloquearAtributos(true);


//window.onload = dadosIniciais();

function dadosIniciais() {
    listaFlor.push(new Flor(0, 'Orquídea', 'Orchideaceae', 'Suave e doce, toques de baunilha e floral', '2022-03-07', 4));
    listaFlor.push(new Flor(1, 'Lírio do Vale', 'Convallaria Majaliss', 'Doce e fresco, notas florais suaves e um toque de musgo', '2023-08-05', 3));
    // listaFlor.push(new Flor('2', 'Margarida', 'Bellis Perennis', 'Fresco e leve, com um toque de doçura', '2023-02-09', '12'));
    // listaFlor.push(new Flor('3', 'Rosa', 'Rosa', 'Doce, rica e complexa, com notas florais intensas e um leve toque de especiarias', '2024-01-06', '30'));
    // listaFlor.push(new Flor('4', 'Tulipa', 'Tulipa Sylvestris', 'Doce, com leves notas florais e, em alguns casos, um toque de mel ou frutado', '2022-07-08', '25'));
    // listaFlor.push(new Flor('5', 'Carméllia Japonica', 'Thaceae', 'Suave e levemente doce, com uma nota floral e um toque sutil de chá verde ou ervas frescas', '2024-04-06', '3'));
    // listaFlor.push(new Flor('6', 'Girassol', 'Heliantusannuus', 'Discreto, mas agradável. Tem um leve toque de mel e sementes', '2024-08-01', '10'));

    listar();
}


function salvarNoComputador() {
    nomeParaSalvar = "./flores.csv";
    let textoCSV = "";
    for (let i = 0; i < listaFlor.length; i++) {
        const linha = listaFlor[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.cien + ";" +
            linha.cheiro + ";" +
            linha.datap + ";" +
            linha.quant + "\n";
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

// Função para processar o arquivo CSV e transferir os dados para a listaFlor
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha      

        listaFlor = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) {
                    // Adiciona os dados à listaFlor como um objeto
                    listaFlor.push({
                        id: dados[0],
                        nome: dados[1],
                        cien: dados[2],
                        cheiro: dados[3],
                        datap: dados[4], 
                        quant: dados[5]
                    });
                }
            }
        }
        // console.log("Upload concluído!", listaFlor); // Exibe no console a lista atualizada
        listar();
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}


function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaFlor.length; i++) {
        const flor = listaFlor[i];
        if (flor.id == chave) {
            flor.posicaoNaLista = i;
            return listaFlor[i];
        }
    }
    return null;
}

function procure() {
    const id = document.getElementById("id").value.trim(); //ajuste
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("id").focus();
        return;
    }

    if (id) {
        flor = procurePorChavePrimaria(id);
        if (flor) { //encontrou
            mostrarDadosFlor(flor);
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
    if (flor == null) {
        id = parseInt(document.getElementById("id").value);
    } else {
        id = flor.id;
    }

    const nome = document.getElementById("nome").value;
    const cien = document.getElementById("cien").value;
    const cheiro = document.getElementById("cheiro").value;
    const datap = document.getElementById("datap").value;
    const quant = document.getElementById("quant").value;

    if (id && nome && cien && cheiro && datap && quant) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                flor = new Flor(id, nome, cien, cheiro, datap, quant);
                listaFlor.push(flor);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                florAlterado = new Flor(id, nome, cien, cheiro, datap, quant);
                listaFlor[flor.posicaoNaLista] = florAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaFlor.length; i++) {
                    if (flor.posicaoNaLista != i) {
                        novaLista.push(listaFlor[i]);
                    }
                }
                listaFlor = novaLista;
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
            linha.cien + " - " +
            linha.cheiro + " - " +
            linha.datap + " - " +
            linha.quant + "<br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaFlor);
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

function mostrarDadosFlor(flor) {
    document.getElementById("id").value = flor.id;
    document.getElementById("nome").value = flor.nome;
    document.getElementById("cien").value = flor.cien;
    document.getElementById("cheiro").value = flor.cheiro;
    console.log(flor.datap);
    document.getElementById("datap").value = flor.datap;
    document.getElementById("quant").value = flor.quant;

    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("cien").value = "";
    document.getElementById("cheiro").value = "";
    document.getElementById("datap").value = "";
    document.getElementById("quant").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("cien").readOnly = soLeitura;
    document.getElementById("cheiro").readOnly = soLeitura;
    document.getElementById("datap").readOnly = soLeitura;
    document.getElementById("quant").readOnly = soLeitura;
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