const btnListarEdicao=document.querySelector("#btnListarEdicao");
import { BASEURL } from "./const.js";

//Botão que lista os alunos
btnListarEdicao.onclick = () => {
    //Lista todos os alunos
    alert("Consultando alunos...");
    listarAlunosEdicao();
};
//Função para mostrar os alunos
async function listarAlunosEdicao() {
    //Função que lista todos os alunos
    const lblLista = document.querySelector("#lblListarEdicao");
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