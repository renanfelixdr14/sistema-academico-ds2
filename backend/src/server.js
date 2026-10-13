import http from "node:http";
import { tratarRotas } from "./routes/aluno-routes.js";
import { enviarJson } from "./util/https.js";

/**
 * definde a porta em que o servidor será executado.
 * 
 * process.env.PORT verifica se o ambiente informou a porta.
 * isso será importante quando fizemos o deploy no Render.
 */
const PORTA = Number(process.env.PORT) || 3000;
// define o endereço em que o servidor aceitará conexões.
const HOST = "0.0.0.0";
/**
 * createServer() cria um servidor HTTP.
 * 
 * A função será executada toda vez que o servidor
 * receber uma nova requisição
 */
const servidor = http.createServer(async (req, res) => {
    try {
        const rotaEncontrada = await tratarRotas(req, res);
        if (!rotaEncontrada) {
            enviarJson(res, 404, {
                sucesso: false,
                mensagem: "Rota não encontrada."
            });
        }
    } catch(erro) {
        console.error("Erro interno do Servidor:", erro);
        enviarJson(res, 500, {
            sucesso: false,
            mensagem: "Erro interno do servidor."
        });
    }
});
/**
 * O servidor permanecerá aguardando requisições
 * na porta configurada.
 */
servidor.listen(PORTA, HOST, () => {
    console.log(
        `Servidor disponivel em http://localhost:${PORTA}`
    );
});