/*
* Agora a Model vai ser exclusivamente para conversar com a Api
*
* A validação do frontend melhora a experiencia do usuário, mas não
* subistitui a validação do backend.
*/
const AlunoModel = {
    
    // padroniza o valor antes de utilizar, se o valor for null ou undifined devolve vazia.
    normalizarTexto(valor) {
        //se valor não encontrado retorna null
        if(valor === null || valor === undefined) {
            return "";
        }

        return String(valor).trim();
    },

    // verificação simples de email, utilizando && por que precisam das duas condições serem verdadeiras.
    validarEmail(email) {
        return email.includes("@") && email.includes(".");
    },

    validar(dados) {
     // Cria um novo objeto com os valores normalizados.
     const aluno = {
        ra: AlunoModel.normalizarTexto(dados.ra),
        nome: AlunoModel.normalizarTexto(dados.nome),
        // para email vamos deixar com letras minusculas.
        email: AlunoModel
            .normalizarTexto(dados.email)
            .toLowerCase(),
        curso: AlunoModel.normalizarTexto(dados.curso),
        turma: AlunoModel.normalizarTexto(dados.turma)
     };

     if (
        aluno.ra === "" ||
        aluno.nome === "" ||
        aluno.email === "" ||
        aluno.curso === "" ||
        aluno.turma === "" 
     ) {
        return {
            sucesso: false,
            mensagem: "Todos os campos são obrigatórios."
        };
     }

     // verifica o formato inicial do e-mail.
     if (!AlunoModel.validarEmail(aluno.email)) {
        return {
            sucesso: false,
            mensagem: "Informe um e-mail válido."
        };
     }

     // se os dados forem validos devolveremos true
     return {
        sucesso: true,
        dados: aluno
     };
    }
};