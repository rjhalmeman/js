class Carro {
    constructor(placa, nome, dataLancamento, peso, cor, posicaoNaLista) {
        this.placa = placa;
        this.nome = nome;
        this.dataLancamento = dataLancamento;
        this.peso = peso;
        this.cor = cor;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
