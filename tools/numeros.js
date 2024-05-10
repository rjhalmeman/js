function simEhNumero(value) {
    return typeof value === 'number' && !isNaN(value);
    /*
     console.log(isNumber(42));      // Retorna true
     console.log(isNumber("42"));    // Retorna false
     console.log(isNumber("Hello")); // Retorna false
     console.log(isNumber(NaN));     // Retorna false

     para usar deve-se incluir o import 
     <script src="../tools/numeros.js"></script> 
    */
}
