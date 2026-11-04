import express from "express";
//importa o responsavel pelos cabeçalhos.
import cors from "cors";
import alunoRoutes from "./routes/aluno-routes.js";

/**
 * Criando app Express.
 * 
 * app será o objeto principal de configuração da API.
 */
const app = express();

// configurando o CORS da aplicação.
// Permitindo requisições originadas de qualquer endereço.
app.use(
    cors({
        /**
         * O asteristico permite qualquer origem.
         * 
         * Posteriormente no deploy, poderemos
         * restringir para o endereço do Netlify.
         */
        origin: "*",
        // metodos autorizados.
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        /**
         * Cabeçalhos que poderao ser enviados
         * pelo front.
         * 
         * Autorization será utilizado futuramente no envio
         * do token JWT.
         */
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

/**
 * Middleware respnsável por interpretar corpos de requisição no formato JSON.
 * Quando recebemos:
 * {
 * "nome": "Ana"
 * }
 * O Express transformará o JSON em um objeto
 * e disponibilizará o resultado em req.body
 */
app.use(express.json());

// responsavel por verificar se a Api está funcionando.
app.get("/api/health", (req, res) => {
    /**
     *res.status(200) define o status HTTP.
     *
     * json() converte o objeto para JSON
     * e finaliza a resposta. 
     */
    return res.status(200).json({
        status: "ok",
        mensagem: "Servidor Express funcionando."
    });
});

/**
 * Registra as rotas dos alunos.
 * 
 * Todas as rotas existentes em alunoRoutes
 * receberão o prefixo /api/alunos.
 */
app.use("/api/alunos", alunoRoutes);

// Middleware executado quando nenhyma rota anterios corresponde à requisição.
app.use((req, res) => {
    return res.status(404).json({
        sucesso: false,
        mensagem: "Rota não encontrada."
    });
});

/**
 * Middleware global para tratamento de erros.
 * Um middleware de erro possui quatro parametros:
 * erro, req, res e next.
 */
app.use((erro, req, res, next) => {
    /**
     * O express.json() gera o tipo
     * entity.parse.failed quando recebe
     * um JSON inválido.
     */
    if (erro.type === "entity.parse.failed") {
        return res.status(400).json({
            sucesso: false,
            mensagem:
            "O corpo da requisição contém um JSON inválido."
        });
    }

    // Registra os detalhes no terminal.
    console.error("Erro interno do servidor:", erro);
    // envia uma mensagem genérica ao cliente.
    return res.status(500).json({
        sucesso: false,
        mensagem: "Erro interno do servidor."
    });
});
// manda para server.js.
export default app;