/*
* Model de Alunos
*
* O Model é responsável:
* - pelos dados dos alunos;
* - pelas validações;
* - pelas regras do cadastro.
*/
const AlunoModel = {
    
    alunos: [],
    
    // padroniza o valor antes de utilizar, se o valor for null ou undifined devolve vazia.
    normalizarTexto(valor) {
        if(valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    // verificação simples de email, utilizando && por que precisam das duas condições serem verdadeiras.
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    // Procura o aluno pela RA, se encontrar, devolve o objeto aluno, se não devolve undefined.
    localizarPorRa(ra) {
        return AlunoModel.alunos.find(
            aluno => aluno.ra === ra
        );
    },

    gerarProximoId(alunos) {
        if (alunos.length === 0) {
            return 1;
        }

        const ids = alunos.map(
            aluno => aluno.id
        );

        // feito pra encontrar o maior id usando (...)
        // para entregar o todos os numeros o Math.max().
        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },

    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

         if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        if(AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            }
        }

        const aluno = {
            // nesta versão, o id e calculado a quantidade de alunos + 1. mais tarde será o banco que fara isso.
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            // todo aluno começa com ativo, no futuro esse valor poderá ser alterado.
            ativo: true
        };
        return{
            sucesso: true,
            aluno: aluno
        };
    }
};