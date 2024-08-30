class Pessoa {
    constructor(cpf, nome, dataNascimento, altura) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.altura = altura;
    }
}

function preencherComDadosALista(listaDePessoas){
    listaDePessoas.push(new Pessoa('11111111111', 'Maria Silva', '1990-01-01', 1.65));
    listaDePessoas.push(new Pessoa('22222222222', 'João Souza', '1985-05-23', 1.75));
    listaDePessoas.push(new Pessoa('33333333333', 'Ana Pereira', '1992-08-14', 1.68));
    listaDePessoas.push(new Pessoa('44444444444', 'Carlos Lima', '1988-02-17', 1.80));
    listaDePessoas.push(new Pessoa('55555555555', 'Paula Almeida', '1995-12-30', 1.70));
    listaDePessoas.push(new Pessoa('66666666666', 'Ricardo Santos', '1991-09-12', 1.72));
    listaDePessoas.push(new Pessoa('77777777777', 'Fernanda Costa', '1983-04-04', 1.60));
    listaDePessoas.push(new Pessoa('88888888888', 'Bruno Ferreira', '1994-11-19', 1.78));
    listaDePessoas.push(new Pessoa('99999999999', 'Camila Rocha', '1987-07-22', 1.62));
    listaDePessoas.push(new Pessoa('00000000000', 'Gustavo Oliveira', '1993-03-09', 1.85));

    return listaDePessoas;
}

function obterNomes(listaDePessoas) {
    let nomes = [];
    for (let i = 0; i < listaDePessoas.length; i++) {
        nomes.push(listaDePessoas[i].nome);
    }
    return nomes;
}

function obterNomesEAlturas(listaDePessoas) {
    let nomesEAlturas = [];
    for (let i = 0; i < listaDePessoas.length; i++) {
        nomesEAlturas.push(listaDePessoas[i].nome+"-"+listaDePessoas[i].altura);
    }
    return nomesEAlturas; //retorna um vetor com strings
}

function obterNomesEAlturasObjetos(listaDePessoas) {
    //esta função devolve uma lista de objetos com nomes e alturas. Útil quando 
    //serão feitas novas consultas sobre o resultado
    let nomesEAlturas = [];
    for (let i = 0; i < listaDePessoas.length; i++) {
        nomesEAlturas.push({
            nome: listaDePessoas[i].nome,
            altura: listaDePessoas[i].altura
        });
    }
    return nomesEAlturas;
}


let listaDePessoas = [];
listaDePessoas = preencherComDadosALista(listaDePessoas);
let listaComNomes = obterNomes(listaDePessoas);

let nomesEAlturas = obterNomesEAlturas(listaDePessoas);

console.log(listaComNomes);
console.log("-----");
console.log(nomesEAlturas);
