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

    // realiza cadastro dos alunos.
    /*
    * o paramentro dados deverá ser um objeto com:
    * - ra;
    * - nome;
    * - email;
    * - curso;
    * - turma;
    * 
    */
    cadastrar(dados) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        /* 
        * Verifica se algum campo obrigatório está vazio
        * basta que uma das condições seja verdadeira para cadastro recusado.
        */
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

        // quando o email for considerado invalido retorna o erro.
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        // Se ja existir o RA, o objeto vai ser devolvido o cadastro duplicado será impedido.
        if(AlunoModel.localizarPorRa(ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            }
        }

        // Se as validações forem completas, cria o objeto aluno.
        const aluno = {
            // nesta versão, o id e calculado a quantidade de alunos + 1. mais tarde será o banco que fara isso.
            id: AlunoModel.alunos.length + 1,
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            // todo aluno começa com ativo, no futuro esse valor poderá ser alterado.
            ativo: true
        };

        // adiciona o aluno ao final do array, o aluno faz parte dos dados mantidos pelo Model.
        AlunoModel.alunos.push(aluno);

        // devolve cadastro foi concluido com sucesso.
        return {
            sucesso: true,
            aluno: aluno
        };
    },

    /*
    * Devolve a lista de alunos cadastrados.
    *
    * O operador spread (...) cria um novo array contendo os mesmos alunos.
    * Assim, não devolvemos diretamente o array original armazenado dentro do Model.
    * 
    */
    Listar() {
        return [...AlunoModel.alunos];
    }

};