class Jogador {
    constructor(id, nome,dataNascimento, posicaoNaLista) {
        this.id= id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    
        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}