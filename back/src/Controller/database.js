//Conexão com o banco
import firebird from "node-firebird";

const dbOptions = {
  host: "127.0.0.1",
  port: 3050,
  database:
    "C:\\TrabalhoFabiano\\back\\Banco\\Alunos.fdb",
  user: "sysdba",
  password: "masterkey",
  lowercase_keys: true,
  role: null,
  pageSize: 4096,
  encoding: "UTF-8",
  blobAsText: true
};

function executeQuery(sql, params) {
    return new Promise((resolve, reject) => {
        firebird.attach(dbOptions, function (err, db) {
            if (err) {
                console.error("Erro ao conectar ao banco:", err);
                return reject(err);
            }

            db.query(sql, params, function (err, result) {
                if (err) {
                    console.error("Erro ao executar a query:", err);
                    db.detach();
                    return reject(err);
                }

                console.log("Resultado da query:", result); // <-- Verifica o retorno da query
                db.detach();
                resolve(result);
            });
        });
    });
}

export { executeQuery };