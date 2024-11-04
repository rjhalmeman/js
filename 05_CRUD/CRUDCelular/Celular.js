class Celular { 
constructor (id,marca,modelo,fabricante,dataLancamento,memoriaRAM,memoriaROM,preco, posicaoNaLista) {
this.id = id;
this.marca = marca;
this.modelo = modelo;
this.fabricante = fabricante;
this.dataLancamento = dataLancamento;
this.memoriaRAM = memoriaRAM;
this.memoriaROM = memoriaROM;
this.preco = preco;


this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
}
}
