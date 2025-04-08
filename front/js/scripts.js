const btnListar = document.querySelector("#btnListar");
const btnGravar = document.querySelector("#btnGravar");
const btnBuscar = document.querySelector("#btnBuscar");
import {BASEURL} from "./const.js";

//Botões
btnGravar.onclick = async () => {
    //Grava o aluno
    alert("Gravando...");  
    cadastrarAluno();
}

btnExcluir.onclick = () => {
    //Exclui o aluno utilizando a matricula
    alert("Excluindo...");
    excluirAluno();
};

btnBuscar.onclick = () => {
    //Busca o aluno com base na matricula
    alert("Buscando...");
    buscarAluno();
};

btnListar.onclick = () => {
    //Lista todos os alunos
    alert("Consultando alunos...");
    listarAlunos();
};

//Funções
async function cadastrarAluno() {
    //Função que cadastra os alunos
    const nome = document.querySelector("#inpNome");
    const matricula = document.querySelector("#inpMatricula");
    const turma = document.querySelector("#inpTurma");
    const cr = document.querySelector("#inpCr");
    
    if (!nome || !matricula || !turma || !cr) { 
        alert("Preencha todos os campos!");
        return;
    }
    const aluno = { 

        nome: nome.value, 
        matricula: matricula.value, 
        turma: turma.value, 
        cr: cr.value 
    };

    try {
        const response = await fetch(`${BASEURL}/alunos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Limpa os campos após o cadastro
        document.querySelector("#inpNome").value = "";
        document.querySelector("#inpMatricula").value = "";
        document.querySelector("#inpTurma").value = "";
        document.querySelector("#inpCr").value = "";
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        mensagem.innerHTML = `Erro ao cadastrar aluno: ${error.message}`;
    }
}
async function excluirAluno() {
    // Função que exclui os alunos
    const inpExcluir = document.querySelector("#inpExcluir");
    const matriculaAluno = inpExcluir.value.trim();

    if (!matriculaAluno) {
        alert("Informe uma matrícula válida!");
        return;
    }

    console.log(`${BASEURL}/alunos/${matriculaAluno}`);

    try {
        const response = await fetch(`${BASEURL}/alunos/${matriculaAluno}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            alert("Aluno excluído com sucesso!");

            // Limpa o campo de exclusão
            inpExcluir.value = "";

            // Opcional: Atualiza a tabela automaticamente após exclusão
            listarAlunos(); // Se essa função estiver definida

        } else {
            alert("Erro ao excluir aluno. Verifique se a matrícula está correta.");
            console.log("Erro ao excluir aluno. Verifique se a matrícula está correta.");
        }

    } catch (error) {
        console.error("Erro ao excluir aluno:", error);
    }
}

async function buscarAluno() {
    //Função que busca os alunos com a matricula
    const inpBuscar = document.querySelector("#inpBuscar").value.trim();;
    const lblBuscar = document.querySelector("#lblBuscar");
    const matricula = inpBuscar;

    try {
        const response = await fetch(`${BASEURL}/alunos/matricula/${matricula}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            lblBuscar.textContent = "Aluno não encontrado. Digite uma matricula valida!";
            return;
        }
        
        const aluno = await response.json();
        lblBuscar.textContent = `Nome: ${aluno.nome} | Turma: ${aluno.turma} | Matrícula: ${aluno.matricula}`;
    } catch (error) {
        console.error("Erro ao buscar aluno:!", error);
        lblBuscar.textContent = "Erro ao buscar aluno. Verifique a conexão.";
    }
}
async function listarAlunos() {
    //Função que lista todos os alunos
    const lblLista = document.querySelector("#lblListar");
    lblLista.innerHTML = "";

    try {
        const response = await fetch(`${BASEURL}/alunos`);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const dados = await response.json();

        if (Array.isArray(dados)) {
            dados.forEach(aluno => {
                const alunoDiv = document.createElement("div");
                alunoDiv.textContent = rowProd(aluno);
                lblLista.appendChild(alunoDiv);
            });
        } else {
            lblLista.innerHTML = "A resposta não contém uma lista de alunos.";
        }
    } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        lblLista.innerHTML = `Erro ao carregar alunos: ${error.message}`;
    }
}
function rowProd(aluno) {
    //Função escreve os alunos na tela
    return `ID: ${aluno.id}, Nome: ${aluno.nome}, Turma: ${aluno.turma},Matricula: ${aluno.matricula}, Cr: ${aluno.cr}`;
}

document.getElementById("btnGravarEdicao").addEventListener("click", async () => {
    const nome = document.getElementById("inpNomeEdicao").value.trim();
    const turma = document.getElementById("inpTurmaEdicao").value.trim();
    const matricula = document.getElementById("inpMatriculaEdicao").value.trim();    
    const cr = parseFloat(document.getElementById("inpCrEdicao").value);

    if (!nome || !turma || !matricula || isNaN(cr)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const aluno = { nome, turma, matricula, cr };

    try {
        const response = await fetch("http://localhost:5500/alunos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert("Erro ao editar: " + data.error);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor.");
    }
});
