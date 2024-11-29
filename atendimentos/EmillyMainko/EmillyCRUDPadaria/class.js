class Padaria {
    constructor(cnpj, nome, rua, cep, lucro, datafundacao, posicaoNaLista) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.rua = rua;
        this.cep = cep;
        this.lucro = lucro;
        this.datafundacao = datafundacao;
        

        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}