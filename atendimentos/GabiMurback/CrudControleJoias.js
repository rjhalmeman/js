let listaJoias = [];
let oQueEstaFazendo = '';
let joias = null;
bloquearAtributos(true);


function dadosInicias() {
    listaJoias.push(new Joia(0, "Anel de Ouro", 'Ouro', '2023-01-15', 'Anel', '10'));
    listaJoias.push(new Joia(1, "Colar de Prata", 'Prata', '2022-11-20', 'Colar', '20'));
    listaJoias.push(new Joia(2, "Bracelete de Platina", 'Platina', '2021-05-30', 'Bracelete', '15'));
    listaJoias.push(new Joia(3, "Brinco de Ouro", 'Ouro', '2020-03-10', 'Brinco', '5'));
    listar()

}

function salvarNoComputador() {
    nomeParaSalvar = "./crud.csv";
    let textoCSV = "";
    for (let i = 0; i < listaJoias.length; i++) {
        const linha = listaJoias[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.metal + ";" +
            linha.dataFabricacao + ";" +
            linha.tipo + ";" +
            linha.peso + "\n";
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


function fazerDownload() {
    nomeParaSalvar = "arquivo.csv";
    let textoCSV = "";
    for (let i = 0; i < listaJoias.length; i++) {
        const linha = listaJoias[i];
        textoCSV += linha.id + ";" +
            linha.inputNome + ";" +
            linha.inputMetal + ";" +
            linha.inputDataFabricacao + ";" +
            linha.inputTipo + ";" +
            linha.inputPeso + "\n";
    }

    salvarEmArquivo(nomeParaSalvar, textoCSV);
}



function fazerUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv, text/csv";

    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            processarArquivo(arquivo);
        }
    };
    input.click();
}

function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split("\n");
        listaJoias = [];
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(";");
                if (dados.length === 6) {
                    listaJoias.push({
                        id: dados[0],
                        nome: dados[1],
                        metal: dados[2],
                        dataFabricacao: dados[3],
                        tipo: dados[4],
                        peso: dados[5]
                    });
                }
            }
        }
        listar();
        alert(listaJoias)
    }
    leitor.readAsText(arquivo);
}

function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaJoias.length; i++) {
        const joia = listaJoias[i];
        if (joia.id === chave) {
            joia.posicaoNaLista = i;
            return listaJoias[i];
        }
    }
    return null;
}

function procure() {
    const id = parseInt(document.getElementById("inputId").value);
    if (id) {
        joias = procurePorChavePrimaria(id); if (joias) {
            mostrarDadosJoias(joias);
            visibilidadeDosBotoes("inline", "none", "inline", "inline", "none");
            mostrarAviso("Achou na lista, pode alterar ou excuir");
        } else {
            limparAtributos();
            visibilidadeDosBotoes("none", "inline", "none", "none", "none");
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
    mostrarAviso("INSERINDO - Digite os atributos e clique o botão salvar");
    document.getElementById("inputId").focus();
}
function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique em salvar.");
}

function excluir() {
    bloquearAtributos(false)
    visibilidadeDosBotoes("none", "none", "none", "none", "inline");
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - Clique em salvar para confirmar.");
}

 function salvar() {
    const id = parseInt(document.getElementById("inputId").value);
    const inputNome = document.getElementById("inputNome").value.trim();
    const inputMetal = document.getElementById("inputMetal").value.trim();
    const inputDataFabricacao = document.getElementById("inputDataFabricacao").value.trim();
    const inputTipo = document.getElementById("inputTipo").value.trim();
    const inputPeso = parseFloat(document.getElementById("inputPeso").value.trim()) || 0;

    if (id && inputNome && inputMetal && inputDataFabricacao && inputTipo && inputPeso > 0) {
        const novaJoia = {
            id,
            inputNome,
            inputMetal,
            inputDataFabricacao,
            inputTipo,
            peso: inputPeso
        };

        novaJoia.valor = calcularValorJoia(novaJoia);

        switch (oQueEstaFazendo) {
            case "inserindo":
                listaJoias.push(novaJoia);
                mostrarAviso(`Joia inserida na lista com valor: R$ ${novaJoia.valor.toFixed(2)}`);
                break;

            case "alterando":
                if (joias) {
                    joias.inputNome = inputNome;
                    joias.inputMetal = inputMetal;
                    joias.inputDataFabricacao = inputDataFabricacao;
                    joias.inputTipo = inputTipo;
                    joias.peso = inputPeso;
                    joias.valor = calcularValorJoia(joias);
                    listaJoias[joias.posicaoNaLista] = joias;
                    mostrarAviso("Joia alterada.");
                }
                break;

            case "excluindo":
                listaJoias = listaJoias.filter((_, index) => index !== joias.posicaoNaLista);
                mostrarAviso("Joia excluída.");
                break;

            default:
                mostrarAviso("Erro ao salvar.");
        }

        // Ordena a lista pelo ID
        ordenarListaPorId(listaJoias);

        listar(); // Atualiza a lista na interface
        limparAtributos();
        visibilidadeDosBotoes("inline", "none", "none", "none", "none");
    } else {
        mostrarAviso("Preencha todos os campos corretamente!");
    }
}


function calcularValorJoia(joia) {
    const valoresPorMetal = {
        ouro: 200, // Valor por grama
        prata: 50,
        platina: 300
    };

    const peso = parseFloat(joia.peso || 0);
    const metal = joia.inputMetal.trim().toLowerCase();
    const valorMetal = valoresPorMetal[metal] || 0;

    if (peso > 0 && valorMetal > 0) {
        return peso * valorMetal;
    } else {
        return 0;
    }
}



function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    // Exemplo de como controlar a visibilidade dos botões
}

function limparAtributos() {
    // Limpar os campos de entrada
}


function listar() {
    const output = document.getElementById("outputSaida");
    if (!output) {
        console.error("Elemento de saída não encontrado.");
        return;
    }

    if (listaJoias.length === 0) {
        output.innerHTML = "<p>Nenhuma joia cadastrada.</p>";
        return;
    }


    let html = "<table border='1' cellspacing='0' cellpadding='5'>";
    html += "<tr><th>ID</th><th>Nome</th><th>Metal</th><th>Data Fabricação</th><th>Tipo</th><th>Peso (g)</th><th>Valor (R$)</th></tr>";

    listaJoias.forEach(joia => {
        html += `
                    <tr>
                        <td>${joia.id}</td>
                        <td>${joia.inputNome}</td>
                        <td>${joia.inputMetal}</td>
                        <td>${joia.inputDataFabricacao}</td>
                        <td>${joia.inputTipo}</td>
                        <td>${joia.peso || 0}</td>
                        <td>${joia.valor?.toFixed(2) || "0.00"}</td>
                    </tr>`;
    });

    html += "</table>";

    output.innerHTML = html; // Atualiza o conteúdo do elemento de saída
}


function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes("inline", "none", "none", "none", "none");
    mostrarAviso
        ("Cancelou a operaÃ§Ã£o de ediÃ§Ã£o");
}



function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;


}



function calcularValorTotal() {
    if (listaJoias.length === 0) {
        mostrarAviso("A lista está vazia. Adicione joias antes de calcular.");
        return;
    }

    let valorTotal = 0;

    // Definindo os valores de referência por tipo de metal
    const valoresPorMetal = {
        ouro: 200, // Exemplo: 200 por grama
        prata: 50, // Exemplo: 50 por grama
        platina: 300 // Exemplo: 300 por grama
    };

    listaJoias.forEach(joia => {
        const peso = parseFloat(joia.peso || 0); // Adicione um atributo de peso se necessário
        const valorMetal = valoresPorMetal[joia.inputMetal.toLowerCase()] || 0;

        if (peso > 0 && valorMetal > 0) {
            valorTotal += peso * valorMetal;
        }
    });

    mostrarAviso(`Valor total das joias: R$ ${valorTotal.toFixed(2)}`);
}

function adicionarCampoPeso() {
    if (!document.getElementById("inputPeso")) {
        const form = document.getElementById("formularioJoias");
        const labelPeso = document.createElement("label");
        labelPeso.innerText = "Peso (em gramas): ";
        const inputPeso = document.createElement("input");
        inputPeso.id = "inputPeso";
        inputPeso.type = "number";
        inputPeso.step = "0.01";
        form.appendChild(labelPeso);
        form.appendChild(inputPeso);
    }
}


// Chame essa função ao inicializar a aplicação
adicionarCampoPeso();




function mostrarDadosJoias(joias) {
    document.getElementById("inputNome").value = joias.nome;
    document.getElementById("inputMetal").value = joias.metal;
    document.getElementById("inputDataFabricacao").value = joias.dataFabricacao;
    document.getElementById("inputTipo").value = joias.tipo;
    bloquearAtributos(true);
}


function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputMetal").value = "";
    document.getElementById("inputDataFabricacao").value = "";
    document.getElementById("inputTipo").value = "";

    bloquearAtributos(true);
}


function bloquearAtributos(soLeitura) {
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputMetal").readOnly = soLeitura;
    document.getElementById("inputDataFabricacao").readOnly = soLeitura;
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



function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaMusica vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./crud.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaJoias.length; i++) {
        const linha = listaJoias[i]; //variavel linha contem as informações de cada musica
        textoCSV += linha.id + ";" + //concatena os dados das musicas formatados para linha csv (separada por ;)
            linha.id + ";" +
            linha.nome + ";" +
            linha.metal + ";" +
            linha.dataFabricacao + ";" +
            linha.tipo + "\n";
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}


function persistirEmLocalPermanente(nomeArq, conteudo) {
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

// Função para processar o arquivo CSV e transferir os dados para a listaMusica
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split('\n');
        listaJoias = []; // Limpa a lista existente

        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';');
                if (dados.length === 6) { // Verifica se tem 6 campos
                    listaJoias.push({
                        id: dados[0],
                        nome: dados[1],
                        metal: dados[2],
                        dataFabricacao: dados[3],
                        tipo: dados[4],
                        peso: dados[5]
                    });
                } else {
                    console.log("Formato inválido na linha: ", linha);
                }
            }
        }

        // Ordena a lista pelo ID
        ordenarListaPorId(listaJoias);

        listar(); // Atualiza a exibição da lista
    };
    leitor.readAsText(arquivo);
}

function ordenarListaPorId(lista) {
    let n = lista.length;
    let trocou;
    do {
        trocou = false;
        for (let i = 0; i < n - 1; i++) {
            if (parseInt(lista[i].id) > parseInt(lista[i + 1].id)) {
                // Troca os elementos
                let temp = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = temp;
                trocou = true;
            }
        }
        n--; // Reduz o alcance do loop a cada iteração
    } while (trocou);
}
