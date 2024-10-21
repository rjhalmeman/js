class Filme {
    constructor(id, nome, genero, dataLancamento, duracao, estudio, diretor, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.genero = genero;
        this.dataLancamento = dataLancamento;
        this.duracao = duracao;
        this.estudio = estudio;
        this.diretor = diretor;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
