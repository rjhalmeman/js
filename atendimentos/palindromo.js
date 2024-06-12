function ehPalindromo(palavra){
    let nova = "";
    let resp = "";
    for (let i = palavra.length - 1; i >= 0; i--) {
        nova = nova + palavra[i];                
    }
    if (palavra === nova) {
            resp = "É Palíndromo";
        } else {
            resp = "Não é Palíndromo";
        }
    return resp;
}