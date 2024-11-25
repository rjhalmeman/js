let listaAlunos = [] // conjunto de dados

function AdicionarDadosIniciais() {
    let aluno = new Aluno('111', 'Ana Silva', 8.5, 7.2, 8.0, 9.0);
    listaAlunos.push(aluno)

    aluno = new Aluno('222', 'Bruno Costa', 6.3, 5.8, 7.0, 6.5);
    listaAlunos.push(aluno)

    aluno = new Aluno('333', 'Carla Oliveira', 9.1, 8.7, 9.3, 8.9);
    listaAlunos.push(aluno)

    aluno = new Aluno('444', 'Daniel Souza', 7.5, 6.9, 8.0, 7.2);
    listaAlunos.push(aluno)

    aluno = new Aluno('555', 'Eduardo Lima', 5.6, 7.4, 6.5, 6.8);
    listaAlunos.push(aluno)
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
            linha.nota4 + " <br>";
    }
    return texto;
}

function listarDados() {
    document.getElementById("outputSaida").innerHTML = listar(listaAlunos)
}

function adicionarAluno() {
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
    const ra = document.getElementById("inputRa").value
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.ra == chave) {
            return listaAlunos[i];

        }

    }
    return null; // não achou
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

        alert("Não esta na lista esse Ra")
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
function ProcurarPelaPrimeiraLetraDoNome(letra) {
    let vetorNomesEncontrados = [];
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        if (aluno.nome[0].toUpperCase() == letra) {
            vetorNomesEncontrados.push(aluno);
        }
    }
    return vetorNomesEncontrados;

}

function ProcurePorLetra() {
    const letra = document.getElementById("inputLetra").value.toUpperCase();

    let vetorResp = ProcurarPelaPrimeiraLetraDoNome(letra);
    if (vetorResp.length > 0) {
        document.getElementById("outputSaida").innerHTML = listar(vetorResp);
    } else {
        document.getElementById("outputSaida").innerHTML = "";
        alert("Não foi encontrado nome começado com essa letra");
    }

}
function MediaDaTurma() {
    let somaMediaDeAluno = 0;
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        somaMediaDeAluno = somaMediaDeAluno + mediaAluno;
    }
    let mediaGeral = somaMediaDeAluno / listaAlunos.length;
    document.getElementById("spanMediaDaTurma").innerHTML = mediaGeral.toFixed(1);
}


function AlunosComMaioresMedias() {
    let MaiorMedia = 0;

    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        if (mediaAluno > MaiorMedia) {
            MaiorMedia = mediaAluno;
        }

    }
    let conjuntoDeAlunosComMaioresMedias = [];
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        if (mediaAluno == MaiorMedia) {
            conjuntoDeAlunosComMaioresMedias.push(aluno);
        }
    }

    document.getElementById("outputSaida").innerHTML =
        listar(conjuntoDeAlunosComMaioresMedias);
}
function AlunosESituacao() {
    let situacaoDosAlunos = "";
    for (let i = 0; i < listaAlunos.length; i++) {
        const aluno = listaAlunos[i];
        let mediaAluno = (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
        let sit
        if (mediaAluno < 6.0) {
            sit = "Reprovado";
        } else {
            sit = "Aprovado";
        }
        situacaoDosAlunos += aluno.ra + " - " + aluno.nome + " - " + mediaAluno.toFixed(1) + " - " + sit + "<br>"


    }
    document.getElementById("outputSaida").innerHTML = situacaoDosAlunos;
}