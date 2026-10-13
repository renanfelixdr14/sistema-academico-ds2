import AlunoController from "../controller/aluno-controller.js";
import {
    enviarJson,
    enviarSemConteudo
} from "../util/https.js";

export async function tratarRotas(req, res) {

    const url = new URL (
        req.url,
        `http://${req.headers.host || "localhost"}`
    );

    const caminho = url.pathname;
    const metodo = req.method;

    if (metodo === "OPTIONS") {
        enviarSemConteudo(res);
        return true;
    }

    if (metodo === "GET" && caminho === "/api/health") {
        enviarJson(res, 200, {
            status: "ok",
            mensagem: "Servidor funcionando."
        });
        return true;
    }

    if (metodo === "GET" && caminho === "/api/alunos") {
        await AlunoController.listar(req, res);
        return true;
    }

    if (metodo === "POST" && caminho === "/api/alunos") {
        await AlunoController.cadastrar(req, res);
        return true;
    }
    return false;
}