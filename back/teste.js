//Funções base com conexão direta
import {executeQuery} from "./src/Controller/database.js"
// Faz a inserção
async function inserir(aluno) {
    if (!aluno.nome || !aluno.turma || !aluno.matricula || aluno.cr === undefined) {
        throw new Error("Todos os campos são obrigatórios.");
    }

    const sql = `INSERT INTO ALUNOS (NOME, TURMA, MATRICULA, CR) VALUES (?, ?, ?, ?);`;

    try {
        await executeQuery(sql, [aluno.nome, aluno.turma, aluno.matricula, aluno.cr]);
        return { message: "Aluno inserido com sucesso!" };
    } catch (err) {
        if (err.message.includes("UNIQUE")) {
            throw new Error("Já existe um aluno com essa matrícula.");
        }
        throw new Error("Erro ao inserir aluno: " + err.message);
    }
}

//Faz a listagem
async function listar() {
    const sql = `SELECT * FROM ALUNOS`; // Corrigido para usar a tabela correta

    try {
        const alunos = await executeQuery(sql); // Executa a query corretamente
        return alunos; // Retorna os alunos corretamente
    } catch (err) {
        throw new Error("Erro ao listar alunos: " + err.message);
    }
}

//Faz a exclusão 
async function excluir(matricula) {
    if (!matricula) {
        throw new Error("O campo matrícula é obrigatório.");
    }

    const sql = `DELETE FROM ALUNOS WHERE MATRICULA = ?`;

    try {
        await executeQuery(sql, [matricula]);
        console.log(`Aluno com matrícula ${matricula} excluído com sucesso.`);
        return { message: "Aluno excluído com sucesso!" };
    } catch (err) {
        throw new Error("Erro ao excluir aluno: " + err.message);
    }
}

//Faz a busca pelo aluno 
async function buscar(matricula) {
    if (!matricula) {
        throw new Error("O campo matrícula é obrigatório.");
    }
    const sql = `SELECT * FROM ALUNOS WHERE MATRICULA = ?`;

    try {
        const resultado = await executeQuery(sql, [matricula]);

        if (resultado.length === 0) {
            console.log("Aluno não encontrado.");
            return null;
        }

        console.log("Aluno encontrado:", resultado[0]); // Exibe apenas um aluno
        return resultado[0]; // Retorna apenas o primeiro aluno encontrado
    } catch (err) {
        console.error("Erro ao buscar aluno:", err.message);
    }
}

export{inserir,excluir,listar,buscar}