class Pizza {
    constructor(id, nome, tamanho, peso, dataQueCadastrada, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.tamanho = tamanho;
        this.peso = peso;
        this.dataQueCadastrada = dataQueCadastrada;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
