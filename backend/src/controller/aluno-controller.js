import {enviarJson} from "../util/https.js";
import AlunoModel from "../model/aluno-model.js";
/**
 * O controller recebe as requisições encaminhadas pelo
 * Router, chama o Model e produz a resposta.
 */
const AlunoController = {
    
    listar(req, res) {
        const alunos = AlunoModel.listar();
        enviarJson(res, 200, {
            total: alunos.length,
            dados: alunos
        });
    },
    cadastrar(req, res) {
        /**
         * express.json() já converteu o JSON
         * recebido para um objeto JavaScript.
         * 
         * O resultado está disponivel em req.body.
         */
        const dados = req.body;

        //encaminha os dados ao Model.
        const resultado = AlunoModel.cadastrar(dados);

        /**
         * verifica se o Model encontrou
         * algum problema de validação.
         */
        if(!resultado.sucesso) {
            return res.status(resultado.status).json({
                sucesso: false,
                mensagem: resultado.mensagem
            });
        }

        // quando aluno é criado com sucesso retorna 201.
        return res.status(201).json({
            sucesso: true,
            mensagem: "Aluno cadastrado com sucesso.",
            dados: resultado.aluno
        });
    }
};

export default AlunoController;
