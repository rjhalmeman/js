
function procurarPorCPF(cpfProcurado, listaDePessoas){
    console.log(listaDePessoas);
    for (let index = 0; index < listaDePessoas.length; index++) {
        if (listaDePessoas[index].cpf==cpfProcurado) {
            return listaDePessoas[index];
        }
    }
    return null;
}

function procure(){ // quando clicar, chama essa função
    const p = procurarPorCPF(document.getElementById('cpf').value, listaDePessoas);
    if (p) {//p não é nulo
        document.getElementById('nome').value = p.nome;
        document.getElementById('dataNascimento').value = p.dataNascimento;
        document.getElementById('altura').value = p.altura;
    } else {
        alert("cpf não encontrado na lista de pessoas");
    }
}


function preencherComDadosALista(listaDePessoas) {
    //esta função é só para não ficar digitando dados toda vez.... 
    listaDePessoas.push(new Pessoa('11111111111', 'Maria Silva', '1990-01-01', 1.65));
    listaDePessoas.push(new Pessoa('22222222222', 'João Souza', '1985-05-23', 1.75));
    listaDePessoas.push(new Pessoa('33333333333', 'Ana Pereira', '1992-08-14', 1.68));
    listaDePessoas.push(new Pessoa('44444444444', 'Carlos Lima', '1988-02-17', 1.80));
    listaDePessoas.push(new Pessoa('55555555555', 'Paula Almeida', '1995-12-30', 1.70));
    return listaDePessoas;
}

function adicionarPessoa() {
    const cpf = document.getElementById('cpf').value.trim(); // o trim limpa espaços em branco à esquerda e direita da string.
    const nome = document.getElementById('nome').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const alturaInput = document.getElementById('altura').value.trim();
    const altura = parseFloat(alturaInput);

    if (cpf && nome && dataNascimento && alturaInput && !isNaN(altura)) { //verifica se o usuário não deixou nada em branco
        const pessoa = new Pessoa(cpf, nome, dataNascimento, altura);
        listaDePessoas.push(pessoa);
        exibirPessoas();
        limparCampos();
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function exibirPessoas() {
    const pessoasList = document.getElementById('outputListaDePessoas');
    pessoasList.innerHTML = ''; //limpa o innerHTML da lista

    for (let i = 0; i < listaDePessoas.length; i++) {
        const pessoa = listaDePessoas[i];
        let aux = "---------------------------<br>" +
            (i + 1) + "<br>" +
            "<strong>CPF: " + pessoa.cpf + " - " + pessoa.nome + "</strong><br>" +
            "Altura: " + pessoa.altura + " --- Data de Nascimento: " + pessoa.dataNascimento+"<br>";

        pessoasList.innerHTML+=aux;
    }
}

function limparCampos() {
    document.getElementById('cpf').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('altura').value = '';
}

let listaDePessoas = [];
listaDePessoas = preencherComDadosALista(listaDePessoas); //carrega os dados iniciais
// para exibir a lista inicial ao carregar a página

// é executado sempre que houver alteração na página (ao (re)carregar a página)
window.onload = exibirPessoas();