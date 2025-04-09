import { BASEURL } from "./const.js";

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const matricula = params.get("matricula");

    if (!matricula) {
        alert("Matrícula não informada na URL.");
        return;
    }

    try {
        const response = await fetch(`${BASEURL}/alunos/matricula/${matricula}`);
        if (!response.ok) {
            throw new Error("Aluno não encontrado.");
        }

        const aluno = await response.json();

        document.getElementById("inpNomeEdicao").value = aluno.nome;
        document.getElementById("inpTurmaEdicao").value = aluno.turma;
        document.getElementById("inpMatriculaEdicao").value = aluno.matricula;
        document.getElementById("inpCrEdicao").value = aluno.cr;

    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        alert("Erro ao buscar dados do aluno.");
    }
});

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
        const response = await fetch(`${BASEURL}/alunos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Aluno atualizado com sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Erro ao editar: " + data.error);
        }
    } catch (error) {
        console.error("Erro ao editar aluno:", error);
        alert("Erro ao conectar com o servidor.");
    }
});
