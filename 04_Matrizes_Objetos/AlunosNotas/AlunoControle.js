let listaAlunos = []; //conjunto de dados

function adicionarDadosIniciais() {
    listaAlunos = [];//se houver dados na lista, apaga todos
    let aluno = new Aluno('111', 'Ana Silva', 8.5, 7.2, 9.0, 8.0);
    listaAlunos.push(aluno);

    aluno = new Aluno('222', 'Bruno Costa', 6.3, 5.8, 7.0, 6.5);
    listaAlunos.push(aluno);

    aluno = new Aluno('333', 'Carla Oliveira', 9.1, 8.7, 9.3, 8.9);
    listaAlunos.push(aluno);

    aluno = new Aluno('444', 'Daniel Souza', 7.5, 6.9, 8.0, 7.2);
    listaAlunos.push(aluno);

    aluno = new Aluno('555', 'Eduardo Lima', 5.6, 7.4, 6.5, 6.8);
    listaAlunos.push(aluno);

    aluno = new Aluno('666', 'Bruno Costa', 3.2, 5.1, 2.0, 1.5);
    listaAlunos.push(aluno);

    aluno = new Aluno('777', 'Bernadete Pereira da Costa Larga', 8, 8.1, 8.0, 9.5);
    listaAlunos.push(aluno);
}

function listar(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto += linha.ra + " - " +
            linha.nome + " - " +
            linha.nota1 + " - " +
            linha.nota2 + " - " +
            linha.nota3 + " - " +
            linha.nota4 + "<br>";
    }
    return texto;
}

function listarDados() {
    document.getElementById("outputSaida").innerHTML = listar(listaAlunos);
}

function adicionarAluno() {
    //coletar os dados que o usuário digitou
    const ra = document.getElementById("inputRa").value;
    const nome = document.getElementById("inputNome").value;
    const nota1 = parseFloat(document.getElementById("inputNota1").value);
    const nota2 = parseFloat(document.getElementById("inputNota2").value);
    const nota3 = parseFloat(document.getElementById("inputNota3").value);
    const nota4 = parseFloat(document.getElementById("inputNota4").value);

    const aluno = new Aluno(ra, nome, nota1, nota2, nota3, nota4);

    listaAlunos.push(aluno);
}
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.ra == chave) {
            return listaAlunos[i];
        }
    }
    return null;//não achou
}

function procurePorRa() {
    const ra = document.getElementById("inputRa").value;
    const aluno = procurePorChavePrimaria(ra);
    if (aluno == null) {
        document.getElementById("inputNome").value = "";
        document.getElementById("inputNota1").value = "";
        document.getElementById("inputNota2").value = "";
        document.getElementById("inputNota3").value = "";
        document.getElementById("inputNota4").value = "";
        alert("Não está na lista esse cpf");
    } else {
        document.getElementById("inputNome").value = aluno.nome;
        document.getElementById("inputNota1").value = aluno.nota1;
        document.getElementById("inputNota2").value = aluno.nota2;
        document.getElementById("inputNota3").value = aluno.nota3;
        document.getElementById("inputNota4").value = aluno.nota4;
    }
}

function procurarUsandoONome(nomeProcurado) {
    let vetorNomesEncontrados = [];
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.nome == nomeProcurado) {
            vetorNomesEncontrados.push(aluno);
        }
    }
    return vetorNomesEncontrados;
}

function procurePorNome() {
    const nome = document.getElementById("inputNome").value;
    let vetorResp = procurarUsandoONome(nome);
    if (vetorResp.length > 0) {
        document.getElementById("outputSaida").innerHTML = listar(vetorResp);
    } else {
        document.getElementById("outputSaida").innerHTML = "";
        alert("Não foi encontrado esse nome na lista");
    }
}

function procurarUsandoAPrimeiraLetraDoNome(letra) {
    let vetorNomesEncontrados = [];
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.nome[0] == letra) {
            vetorNomesEncontrados.push(aluno);
        }
    }
    return vetorNomesEncontrados;
}

function procureUsandoALetra() {
    const letra = document.getElementById("inputLetra").value.toUpperCase();

    let vetorResp = procurarUsandoAPrimeiraLetraDoNome(letra);
    if (vetorResp.length > 0) {
        document.getElementById("outputSaida").innerHTML = listar(vetorResp);
    } else {
        document.getElementById("outputSaida").innerHTML = "";
        alert("Não foi encontrado nome começado com essa letra");
    }
}

function mediaDaTurma() {
    let somaMediasDeAluno = 0;
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        somaMediasDeAluno = somaMediasDeAluno + mediaAluno;
    }
    let mediaGeral = somaMediasDeAluno / listaAlunos.length;

    document.getElementById("spanMediaTurma").innerHTML = mediaGeral.toFixed(1);

}

function alunosComMaioresMedias() {
    let maiorMedia = 0;

    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        if (mediaAluno > maiorMedia) {
            maiorMedia = mediaAluno;
        }
    }
    let conjuntoDeAlunosComAsMaioresMedias = [];
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        if (mediaAluno == maiorMedia) {
            conjuntoDeAlunosComAsMaioresMedias.push(aluno);
        }
    }

    document.getElementById("outputSaida").innerHTML =
        listar(conjuntoDeAlunosComAsMaioresMedias);
}

function alunosESituacao() {
    let situacaoDosAlunos = "";
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        let sit;
        if (mediaAluno < 6.0) {
            sit = "Reprovado";
        } else {
            sit = "Aprovado";
        }
        situacaoDosAlunos += aluno.ra + " - " + aluno.nome + " - " + mediaAluno.toFixed(1) + " - " + sit + "<br>";

    }

    document.getElementById("outputSaida").innerHTML = situacaoDosAlunos;
}




