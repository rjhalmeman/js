class Queijo { 
    constructor (id,nome,peso, cidadeFabricada, dataFabricada, valor, distribuidor, posicaoNaLista) {
    this.id = id;
    this.nome = nome;
    this.peso = peso;
    this.cidadeFabricada = cidadeFabricada;
    this.dataFabricada = dataFabricada;
    this.valor = valor;
    this.distribuidor = distribuidor;
    
    
    this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
    }