let v = [10,13,15,18,22,11,14,13];

console.log("Soma de todos os elementos = "+ somarConjunto(v));
console.log("Média de todos os elementos = "+ media(v));
console.log("impares = "+ impares(v));
console.log("impares2 = "+ impares2(v));


function somarConjunto(v){
    let soma=0;
    for (let i = 0; i < v.length; i++) {
        soma+=v[i];        
    }
    return soma;
}

function media(v){
    let soma = somarConjunto(v);
    let media = soma/v.length;
    return media;
}

function impares(v){
    let novoV = [];
    for (let i = 0; i < v.length; i++) {
        if (v[i]%2!==0) {
            novoV.push(v[i]);
        }  
    }
    return novoV;
}

function impares2(v){
    let novoV = [];
    for (let i = 0; i < v.length; i++) {
        if (v[i]%2!==0) {
            novoV+=v[i];
        }  
    }
    return novoV;
}