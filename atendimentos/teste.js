function totalAPagar(preco, juros, numParcelas) {
    let p = preco;
    for (let i = 1; i <= numParcelas; i++) {
        p += p * juros;
        console.log(p);
    }
    let parcela = p / numParcelas
    return parcela;
}

let parc = totalAPagar(1000,0.02,10);
console.log(parc);