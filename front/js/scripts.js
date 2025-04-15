import { BASEURL } from "./const.js";

const inpNome = document.querySelector("#inpNome");
const inpTurma = document.querySelector("#inpTurma");
const inpMatricula = document.querySelector("#inpMatricula");
const inpCr = document.querySelector("#inpCr");
const btnGravar = document.querySelector("#btnGravar");
const btnBuscar = document.querySelector("#btnBuscar");
const inpBuscar = document.querySelector("#inpBuscar");
const lblBuscar = document.querySelector("#lblBuscar");
const lblListar = document.querySelector("#lblListar");

// === Cadastrar aluno ===
btnGravar.onclick = async () => {
  if (!inpNome.value || !inpTurma.value || !inpMatricula.value || !inpCr.value) {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = {
    nome: inpNome.value,
    turma: inpTurma.value,
    matricula: inpMatricula.value,
    cr: parseFloat(inpCr.value),
  };

  try {
    const res = await fetch(`${BASEURL}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    if (!res.ok) throw new Error("Erro ao cadastrar aluno");

    limparCampos();
    await listarAlunos();
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar aluno.");
  }
};

// === Buscar aluno ===
btnBuscar.onclick = async () => {
  const matricula = inpBuscar.value.trim();

  if (!matricula) return alert("Digite uma matrícula!");

  try {
    const res = await fetch(`${BASEURL}/alunos/matricula/${matricula}`);
    if (!res.ok) return (lblBuscar.textContent = "Aluno não encontrado.");

    const aluno = await res.json();
    lblBuscar.textContent = `Nome: ${aluno.nome} | Turma: ${aluno.turma} | Matrícula: ${aluno.matricula} | CR: ${aluno.cr}`;
  } catch (err) {
    console.error(err);
    lblBuscar.textContent = "Erro ao buscar aluno.";
  }
};

// === Listar alunos ===
async function listarAlunos() {
  lblListar.innerHTML = "";

  try {
    const res = await fetch(`${BASEURL}/alunos`);
    const alunos = await res.json();

    if (!Array.isArray(alunos)) {
      lblListar.innerHTML = "Nenhum aluno encontrado.";
      return;
    }

    alunos.forEach((aluno) => {
      const card = document.createElement("div");
      card.className = "card mb-2 p-3 shadow-sm";

      card.innerHTML = `
        <strong>${aluno.nome}</strong><br/>
        Turma: ${aluno.turma} | Matrícula: ${aluno.matricula} | CR: ${aluno.cr}
        <div class="mt-2">
          <a href="edicao.html?matricula=${aluno.matricula}" class="btn btn-sm btn-warning me-2">Editar</a>
          <button class="btn btn-sm btn-danger btn-excluir" data-matricula="${aluno.matricula}">Excluir</button>
        </div>
      `;

      lblListar.appendChild(card);
    });

    // Eventos de exclusão com remoção dinâmica
    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.onclick = async () => {
        const matricula = btn.dataset.matricula;
        if (!confirm(`Deseja excluir o aluno com matrícula ${matricula}?`)) return;

        try {
          const res = await fetch(`${BASEURL}/alunos/${matricula}`, {
            method: "DELETE",
          });

          if (res.ok) {
            alert("Aluno excluído com sucesso.");
            btn.closest(".card").remove();
           await listarAlunos();
          } else {
            alert("Erro ao excluir aluno.");
          }
        } catch (err) {
          console.error(err);
          alert("Erro ao excluir aluno.");
        }
      };
    });
  } catch (err) {
    console.error(err);
    lblListar.innerHTML = "Erro ao carregar alunos.";
  }
}

// === Utilitários ===
function limparCampos() {
  inpNome.value = "";
  inpTurma.value = "";
  inpMatricula.value = "";
  inpCr.value = "";
}

// Carrega alunos automaticamente ao iniciar
listarAlunos();
