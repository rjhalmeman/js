class Joias {
    constructor(id, nome, metal, dataFabricacao, tipo, estudio, diretor, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.metal = metal;
        this.dataFabricacao = dataFabricacao;
        this.tipo = tipo;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}