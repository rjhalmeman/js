 let frase = "Yoda inverte as palavras nas frases";

function inverter(frase) {
    const aux = frase.split(" ");
    let ss = "";
    for (let i = aux.length-1; i >= 0; i--) {
        ss = ss + aux[i] + " ";
    }
    return ss;
}

console.log(inverter(frase));