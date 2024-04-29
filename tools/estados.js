function functionObterNomeEstado(sigla) {
    // Converter a sigla para minúsculas para garantir a comparação insensível a maiúsculas
    var siglaLowerCase = sigla.toLowerCase();

    // Inicializar a variável para armazenar o nome completo do estado
    var nomeEstado;

    // Usar um switch case para comparar a sigla do estado
    switch (siglaLowerCase) {
        case "ac":
            nomeEstado = "Acre";
            break;
        case "al":
            nomeEstado = "Alagoas";
            break;
        case "ap":
            nomeEstado = "Amapá";
            break;
        case "am":
            nomeEstado = "Amazonas";
            break;
        case "ba":
            nomeEstado = "Bahia";
            break;
        case "ce":
            nomeEstado = "Ceará";
            break;
        case "df":
            nomeEstado = "Distrito Federal";
            break;
        case "es":
            nomeEstado = "Espírito Santo";
            break;
        case "go":
            nomeEstado = "Goiás";
            break;
        case "ma":
            nomeEstado = "Maranhão";
            break;
        case "mt":
            nomeEstado = "Mato Grosso";
            break;
        case "ms":
            nomeEstado = "Mato Grosso do Sul";
            break;
        case "mg":
            nomeEstado = "Minas Gerais";
            break;
        case "pa":
            nomeEstado = "Pará";
            break;
        case "pb":
            nomeEstado = "Paraíba";
            break;
        case "pr":
            nomeEstado = "Paraná";
            break;
        case "pe":
            nomeEstado = "Pernambuco";
            break;
        case "pi":
            nomeEstado = "Piauí";
            break;
        case "rj":
            nomeEstado = "Rio de Janeiro";
            break;
        case "rn":
            nomeEstado = "Rio Grande do Norte";
            break;
        case "rs":
            nomeEstado = "Rio Grande do Sul";
            break;
        case "ro":
            nomeEstado = "Rondônia";
            break;
        case "rr":
            nomeEstado = "Roraima";
            break;
        case "sc":
            nomeEstado = "Santa Catarina";
            break;
        case "sp":
            nomeEstado = "São Paulo";
            break;
        case "se":
            nomeEstado = "Sergipe";
            break;
        case "to":
            nomeEstado = "Tocantins";
            break;
        default:
            nomeEstado = "Sigla de estado inválida";
    }

    // Retornar o nome completo do estado
    return nomeEstado;
}
