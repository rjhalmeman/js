class Animal {
    constructor(id, nome, dataNascimento, peso, raca, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.peso = peso;
        this.raca = raca;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
