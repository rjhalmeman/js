function verificar() {
    let num = document.getElementById("num").value;
    if (num % 2 == 0) {
        document.getElementById("resp").value = "Par";
    } else {
        document.getElementById("resp").value = "Ímpar";
    }
}