class Livro { 
constructor (issn,nome,dataDeLancamento,preco,autor,editora, posicaoNaLista) {
this.issn = issn;
this.nome = nome;
this.dataDeLancamento = dataDeLancamento;
this.preco = preco;
this.autor = autor;
this.editora = editora;


this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
}
}
