function calcular() {
    let consumo = parseFloat(document.getElementById("consumo").value);
    let valorFinal = "";

    if (consumo >= 0 && consumo <= 5) {
        valorFinal = 90.76;
    } else if (consumo > 5 && consumo <= 10) {
        valorFinal = 90.76 + (consumo - 5) * 2.81;
    } else if (consumo > 10 && consumo <= 15) {
        valorFinal = 90.76 + 5 * 2.81 + (consumo - 10) * 15.64;
    } else if (consumo > 15 && consumo <= 20) {
        valorFinal = 90.76 + 5 * 2.81 + 5 * 15.64 + (consumo - 15) * 15.72;
    } else if (consumo > 20 && consumo <= 30) {
        valorFinal = 90.76 + 5 * 2.81 + 5 * 15.64 + 5 * 15.72 + (consumo - 20) * 15.85;
    } else if (consumo > 30) {
        valorFinal = 90.76 + 5 * 2.81 + 5 * 15.64 + 5 * 15.72 + 10 * 15.85 + (consumo - 30) * 26.82;
    }

    document.getElementById("resp").innerText = `O valor total será de ${valorFinal.toFixed(2)} R$`;
}