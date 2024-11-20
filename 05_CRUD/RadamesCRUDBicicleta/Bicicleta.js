class Bicicleta {
    constructor(id, nome, fabricante, dataDeLancamento, preco, peso, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.fabricante = fabricante;
        this.dataDeLancamento = dataDeLancamento;
        this.preco = preco;
        this.peso = peso;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
