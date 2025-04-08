import express from "express";
import cors from "cors";
import Alunos from "./model/Alunos.js";
import { inserir,excluir,listar,buscar,editar} from "../teste.js";

const app = express();

// Middleware JSON
app.use(express.json({limit: '50mb'}));

app.use(cors());

app.get('/', function(req, res) {
    res.send("OK");
});

//Rota para adicionar um aluno 
app.post("/alunos", async (req, res) => {
    try {
        const aluno = req.body;

        if (!aluno.nome || !aluno.turma || !aluno.matricula || aluno.cr === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        await inserir(aluno);
        res.json({ message: "Aluno inserido com sucesso" });
    } catch (error) {
        console.error("Erro ao inserir aluno:", error);
        res.status(500).json({ error: error.message });
    }
});

// Rota para excluir um aluno
app.delete("/alunos/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        await excluir(matricula);
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir aluno!!" });
    }
});

//Rota para listar alunos
app.get("/alunos", async (req, res) => {
    try {
        const alunos = await listar();
        res.json(alunos); 
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar alunos" });
    }
});

// Rota para buscar um aluno pela matrícula
app.get("/alunos/matricula/:matricula", async (req, res) => {
    try {
        const { matricula } = req.params;
        console.log(`Buscando aluno com matrícula: ${matricula}`);
        const aluno = await buscar(matricula); 
        if (!aluno) {
            return res.status(404).json({ error: "Aluno não encontrado" });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar aluno" });
    }
});


// Rota para editar um aluno
app.put("/alunos", async (req, res) => {
    try {
        const aluno = req.body;

        if (!aluno.nome || !aluno.turma || !aluno.matricula || aluno.cr === undefined) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        await editar(aluno);
        res.json({ message: "Aluno atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        res.status(500).json({ error: error.message });
    }
});
let port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Servidor no ar... na porta : " + port);
});
