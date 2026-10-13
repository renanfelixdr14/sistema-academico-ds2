/**
 * este array representa temporariamente o
 * armazenamento dos alunos.
 * 
 * quando o servidor for encerrado, todos os alunos 
 * cadastrados serão apagados.
 * 
 * Futuramente esse array será substituido
 * por uma tabela no banco de dados MySQL.
 */
const alunos = [];
const AlunoModel = {
    normalizarTexto(valor) {
        // verifica se o valor não foi informado.
        if (valor === null || valor === undefined) {
            return "";
        }
        // formata o texto
        return String(valor).trim();
    },
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },
    localizarPorRa(ra) {
        return alunos.find(aluno => aluno.ra === ra);
    },
    gerarProximoId() {
        if (alunos.length === 0) {
            return 1;
        }
        const ids = alunos.map(aluno => aluno.id);
        const maiorId = Math.max(...ids);
        return maiorId + 1;
    },

    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados?.ra);
        const nome = AlunoModel.normalizarTexto(dados?.nome);
        const email = AlunoModel.normalizarTexto(dados?.email);
        const curso = AlunoModel.normalizarTexto(dados?.curso);
        const turma = AlunoModel.normalizarTexto(dados?.turma);

        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Todos os campos são obrigatórios."
            };
        }
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                status: 400,
                mensagem: "Informe um e-mail válido."
            };
        }
        if (AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                status: 409,
                mensagem: "Já existe um aluno com esse RA."
            };
        }
        // Cria o objeto que representa o novo aluno.
        const aluno = {
            id: AlunoModel.gerarProximoId(),
            ra,
            nome,
            email,
            curso,
            turma,
            ativo : true
        };
        // adiciona o aluno ao array armazenado em mémoria.
        alunos.push(aluno);
        /**
         * retorna o resultado positivo do cadastro.
         */
        return {
            sucesso: true,
            status: 201,
            aluno
        };
    },

    listar() {
        return [...alunos];
    }
};
export default AlunoModel;