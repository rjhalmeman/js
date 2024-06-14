function isPrime(num) {
    if (num <= 1) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    let i = 2;
    while (i < num) { //parte do pressuposto que se encontrou alguma divisão exata no intervalo, não é primo.
        if (num % i === 0) {
            return false;
        }
        i++;
    }
    return true;
}
function ehPrimo(num) {
    let cont = 0;
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            cont++;
            // alert(i);
            if (cont > 2) {
                return false;
            }
        }
    }
    return true;
}

function primoThome(dados) {
    for (i = 2; i <= dados; i++) {
        let resp;
        if (i == dados) {
            return resp;
        }else if (dados % i === 0) {
            return false;            
        }
    }    
}

