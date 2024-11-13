let listaDeEletronicos=[]

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
        listaDeEletronicos = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 8) { //verifica os seis campos
                    // Adiciona os dados à listaMusica como um objeto
                    //id, marca, nome, datadefabricacacao, cor, preco, produto
                    
                    listaDeEletronicos.push({
                        id: dados[0],
                        marca: dados[1],
                        nome: dados[2],
                        datadefabricacacao: dados[3],
                        cor: dados[4],
                        preco: dados[5],
                        produto: dados[6],
                        peso: dados[7]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
        alert(listaDeEletronicos)
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}



function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.marca + " - " +
            linha.nome + " - " +
            linha.datadefabricacacao + " - " +
            linha.cor + " - " +
            linha.preco + "-" + linha.produto + "-" + linha.peso+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("csv").innerHTML = preparaListagem(listaDeEletronicos);
}


/*unction procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaDeEletronicos.length; i++) {
        const eletronico = listaDeEletronicos[i];
        if (eletronico.id == chave) {
            eletronico.posicaoNaLista = i;
            return listaDeEletronicos[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = parseInt(document.getElementById("id").value);
    if (id) { // se digitou um Placa
        eletronico = procurePorChavePrimaria(id);
        if (eletronico) { //achou na lista
            mostrarDadoseletronico(eletronico);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('none', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("id").focus();
        return;
    }
}*/
