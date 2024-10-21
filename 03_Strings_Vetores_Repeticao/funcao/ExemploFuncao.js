function caluleARaizQuadrada (x){
    let r = x**(1/2);
    return r;
}

function pitagoras (b, c){
    return  Math.sqrt(b**2+c**2);    
}



let resultadoDaRaizDeUmNumero = Math.sqrt(25);

console.log("O resultado é = "+ resultadoDaRaizDeUmNumero);

console.log("minha função para calcular a raiz ");

let y = 36;

console.log(caluleARaizQuadrada(y));

let b = 6;
let c = 8;

console.log("A hipotenusa é = "+ pitagoras(c,b))
