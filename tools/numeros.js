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

function numeroValidoTryCatch(str) {
    try {
        // Tenta converter a string para número
        const numero = parseFloat(str);

        // Verifica se o número é um número válido
        if (isNaN(numero)) {
            return null; // Retorna null se não for um número válido
        }

        return numero; // Retorna o número se for válido
    } catch (error) {
        // Se ocorrer uma exceção ao tentar converter a string para número
        // ou durante outra operação no bloco try, capturamos a exceção aqui
        return null; // Retorna null em caso de exceção
    }
}