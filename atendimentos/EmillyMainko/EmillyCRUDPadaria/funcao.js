let listaPadaria = []; // Declara uma lista (array) vazia para armazenar os dados das padarias.
let oQueEstaFazendo = ''; // Declara uma string vazia para controlar a ação atual (inserir, alterar ou excluir).
let padaria = null; // Declara uma variável para armazenar os dados da padaria atualmente selecionada.
bloquearAtributos(true); // Chama uma função que desabilita os campos de entrada inicialmente.

function salvarNoComputador() { 
    // Cria um arquivo CSV contendo os dados da lista de padarias.
    nomeParaSalvar = "./padaria.csv"; // Define o nome do arquivo CSV.
    let textoCSV = ""; // Inicia uma string vazia para armazenar os dados formatados em CSV.
    for (let i = 0; i < listaPadaria.length; i++) {
        // Itera sobre a lista de padarias.
        const linha = listaPadaria[i]; // Obtém os dados de cada padaria.
        textoCSV += linha.cnpj + ";" + 
            linha.nome + ";" +
            linha.rua + ";" +
            linha.cep + ";" +
            linha.lucro + ";" +
            linha.datafundacao + "\n"; 
        // Formata os dados como uma linha CSV e adiciona à string de saída.
    }

    salvarEmArquivo(nomeParaSalvar, textoCSV); // Chama a função para salvar o arquivo no computador.
}

function salvarEmArquivo(nomeArq, conteudo) {
    // Salva o conteúdo em um arquivo de texto.
    const blob = new Blob([conteudo], { type: 'text/plain' }); 
    // Cria um "blob" (objeto representando dados de arquivo) com o conteúdo fornecido.
    const link = document.createElement('a'); 
    // Cria um elemento <a> dinamicamente para gerar o link de download.
    link.href = URL.createObjectURL(blob); 
    // Define a URL do arquivo gerado para o link.
    link.download = nomeArq; // Define o nome do arquivo para download.
    link.click(); // Simula um clique no link para iniciar o download.
    URL.revokeObjectURL(link.href); 
    // Libera a memória usada pela URL temporária.
}

function buscarDadosSalvosNoComputador() {
    // Permite selecionar um arquivo CSV para importar os dados salvos.
    const input = document.createElement('input'); 
    // Cria dinamicamente um elemento <input> do tipo "file".
    input.type = 'file'; // Define o tipo de entrada como arquivo.
    input.accept = '.csv'; // Restringe a seleção a arquivos CSV.
    input.onchange = function (event) {
        // Define o que acontece quando o arquivo é selecionado.
        const arquivo = event.target.files[0]; 
        // Obtém o arquivo selecionado.
        if (arquivo) {
            processarArquivo(arquivo); 
            // Chama a função para processar o arquivo selecionado.
        }
    };
    input.click(); // Simula um clique para abrir o seletor de arquivos.
}

function processarArquivo(arquivo) {
    // Lê e processa o conteúdo do arquivo CSV.
    const leitor = new FileReader(); // Cria um objeto para ler arquivos no navegador.
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Obtém o conteúdo do arquivo lido.
        const linhas = conteudo.split('\n'); // Divide o conteúdo em linhas.
        listaPadaria = []; // Limpa a lista atual.
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim(); 
            // Remove espaços extras ao redor de cada linha.
            if (linha) {
                const dados = linha.split(';'); 
                // Divide a linha em colunas usando ";" como separador.
                if (dados.length === 6) { 
                    // Verifica se a linha contém os 6 campos necessários.
                    listaPadaria.push({
                        cnpj: dados[0],
                        nome: dados[1],
                        rua: dados[2],
                        cep: dados[3],
                        lucro: dados[4],
                        datafundacao: dados[5]
                    }); 
                    // Adiciona os dados como um objeto à lista de padarias.
                }
            }
        }
        listar(); // Atualiza a exibição da lista.
    };
    leitor.readAsText(arquivo); // Lê o conteúdo do arquivo como texto.
}

function procurePorChavePrimaria(chave) {
    // Procura um elemento na lista pelo CNPJ.
    for (let i = 0; i < listaPadaria.length; i++) {
        const padaria = listaPadaria[i]; 
        // Itera sobre a lista de padarias.
        if (padaria.cnpj == chave) { 
            // Compara o CNPJ atual com a chave fornecida.
            padaria.posicaoNaLista = i; 
            // Salva a posição na lista para referência.
            return listaPadaria[i]; 
            // Retorna o objeto encontrado.
        }
    }
    return null; // Retorna null se não encontrar.
}

function procure() {
    // Função chamada ao clicar no botão "Procure".
    const cnpj = document.getElementById("cn").value; 
    // Obtém o valor do campo de entrada de CNPJ.
    if (cnpj) {
        padaria = procurePorChavePrimaria(cnpj); 
        // Procura o CNPJ na lista.
        if (padaria) {
            // Se encontrou, exibe os dados da padaria.
            mostrarDadosPadaria(padaria);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); 
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else {
            // Se não encontrou, prepara os campos para inserção.
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("cn").focus(); 
        // Foca no campo de entrada de CNPJ se estiver vazio.
        return;
    }
}


//backend->frontend
function inserir() {
    const cnpj = parseInt(document.getElementById("cn").value);
    if(procurePorChavePrimaria(cnpj)!==null){
        alert('cnpj já cadastrado na lista,tente novamente com outro cnpj')
    }
else{
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("cn").focus();
}
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

    let cnpj;
    if (padaria == null) {
        cnpj = document.getElementById("cn").value;
    } else {
        cnpj = padaria.cnpj;
    }
    const nome= document.getElementById("n").value;
    const rua = document.getElementById("r").value;
    const cep = parseInt(document.getElementById("c").value);
    const lucro = document.getElementById("l").value;
    const datafundacao = document.getElementById("d").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (cnpj && nome && rua && cep && lucro && datafundacao) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                padaria = new Padaria(cnpj, nome, rua, cep, lucro, datafundacao);
                listaPadaria.push(padaria);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                padariaAlterado = new Padaria(cnpj, nome, rua, cep, lucro, datafundacao);
                listaPadaria[padaria.posicaoNaLista] = padariaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaPadaria.length; i++) {
                    if (padaria.posicaoNaLista != i) {
                        novaLista.push(listaPadaria[i]);
                    }
                }
                listaPadaria = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("cn").focus();
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
            linha.cnpj + " - " +
            linha.nome + " - " +
            linha.rua + " - " +
            linha.cep + " - " +
            linha.lucro + " - " +
            linha.datafundacao + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaPadaria);
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

// Função para mostrar os dados do Carro nos campos
function mostrarDadosPadaria(padaria) {
    document.getElementById("cn").value = padaria.cnpj;
    document.getElementById("n").value = padaria.nome;
    document.getElementById("r").value = padaria.rua;
    document.getElementById("c").value = padaria.cep;
    document.getElementById("l").value = padaria.lucro;
    document.getElementById("d").value = padaria.datafundacao;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("n").value = "";
    document.getElementById("r").value = "";
    document.getElementById("c").value = "";
    document.getElementById("l").value = "";
    document.getElementById("d").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("cn").readOnly = !soLeitura;
    document.getElementById("n").readOnly = soLeitura;
    document.getElementById("r").readOnly = soLeitura;
    document.getElementById("c").readOnly = soLeitura;
    document.getElementById("l").readOnly = soLeitura;
    document.getElementById("d").readOnly = soLeitura;
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
    document.getElementById("cn").focus();
}

function avaliar() {
    window.location.href = 'avaliacao.html'; // Redireciona para a página de avaliação
}