function isdddNumber(value) {
    return typeof value === 'number' && !isNaN(value) && !isNaN(parseFloat(value));
    /*
        compara o tipo e verifica se é um número válido

      foi pensado para se perguntar
      isto é um Número? 
      Sim
      Não

      é verdade que isso é um número?
      sim
      não


     console.log(isNumber(42));      // Retorna true
     console.log(isNumber("42"));    // Retorna false
     console.log(isNumber("Hello")); // Retorna false
     console.log(isNumber(NaN));     // Retorna false

     para usar deve-se incluir o import 
     <script src="../tools/numeros.js"></script> 
    */
}
function numeroValido(str) {
    let deuErro = false;
    for (let i = 0; i < str.length; i++) {
        // Verifica se o código ASCII do caractere está na faixa dos dígitos numéricos (48 a 57)
        if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
            deuErro = true;
            break; // Ao encontrar um caractere inválido, sai do loop imediatamente
        }
    }
    if (deuErro) {
        return null; // Retorna null apenas se encontrar um caractere inválido
    } else {
        return parseFloat(str); // Retorna o número convertido se não encontrar erros
    }

}
