/*
    para usar deve-se incluir o import 
    <script src="../tools/numeros.js"></script> 

    compara o tipo e verifica se é um número válido

     console.log(numeroValido(42));      // Retorna 42
     console.log(numeroValido("42"));    // Retorna null
     console.log(numeroValido("Hello")); // Retorna null
     console.log(numeroValido(1.5));     // Retorna  1.5

    */
function numeroValido(str) {
    let deuErro = false;
    if (isNaN(str) || str === "") {
        return null;
    } else {
        for (let i = 0; i < str.length; i++) {
            // Verifica se o código ASCII do caractere está na faixa dos dígitos 
            //numéricos (48 a 57)

            if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
                if (str.charCodeAt(i) !== 46) {
                    deuErro = true;
                    break; // Ao encontrar um caractere inválido, sai do loop imediatamente
                }
            }
        }
        if (deuErro) {
            return null; // Retorna null apenas se encontrar um caractere inválido
        } else {
            return parseFloat(str); // Retorna o número convertido para real se não encontrar erros
        }
    }
}
