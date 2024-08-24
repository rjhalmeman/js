

function ehPrimo(num) {
    let cont = 0;
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            cont++;            
            if (cont > 2) {
                return false;
            }
        }
    }
    return true;
}

console.log(ehPrimo(4));