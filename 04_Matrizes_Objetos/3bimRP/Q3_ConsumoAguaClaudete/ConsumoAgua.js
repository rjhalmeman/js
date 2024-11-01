class ConsumoAgua {
    constructor(cpf, nome, mes1, mes2, mes3, mes4, mes5, mes6, posicaoNaLista) {
        this.cpf = cpf;
        this.nome = nome;
        this.mes1 = mes1;
        this.mes2 = mes2;
        this.mes3 = mes3;
        this.mes4 = mes4;
        this.mes5 = mes5;
        this.mes6 = mes6;
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}