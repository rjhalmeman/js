class Carro {
    constructor(placa, nome, dataLancamento) {
        this.placa = placa;
        this.nome = nome;
        this.dataLancamento = dataLancamento;
    }
}

// Inicializando um vetor de carros
let carros = [];

// Adicionando três registros do tipo Carro ao vetor
carros.push(new Carro("ABC-1234", "Fusca", "1974-01-01"));
carros.push(new Carro("DEF-5678", "Civic", "2008-05-15"));
carros.push(new Carro("GHI-9101", "Mustang", "2019-07-20"));
carros.push(new Carro("zzz-1212", "Cadilac", "1950-07-20"));
carros.push(new Carro("www-0987", "BMW z6", "2023-07-20"));

//console.log(carros[2].placa);

// Exibindo o vetor de carros
//console.log(carros[1].nome+" -- "+carros[1].placa);
for (let i = 0; i < carros.length; i++) {
    console.log(carros[i].placa + " - "
         + carros[i].nome);
}

