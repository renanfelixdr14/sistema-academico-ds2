/**
 * SERVICE DE ALUNOS
 * 
 * o Service vai ser responsavel pela comunicação do front com a Api
 * 
 * O controller não precisa conhecer os detalhes do fetch(),
 * dos cabeçalos ouda conversão em JSON().
 */
const AlunoService = {
    // Endereço base dos endpoints do alunos.
    URL_API: "http://localhost:3000/api/alunos",

    //processa uma resposta recebida da Api.
    async processarResposta(resposta) {
        let resultado;
        try {
            // convert um Json recebido em
            // um objeto Javascript válida
            resultado = await resposta.json();
        } catch(erro) {
            throw new Error (
                "O servidor retornou resposta inválida."
            );
        }

        // A propriedade ok será verdadeira ára respostas entre 200 e 299.
        if (!resposta.ok) {
            // utiliza a mensagem enviada pela API.
            // se ela não existir, utiliza uma mensagem genérica.
            throw new Error(
                resultado.mensagem ||
                "Não foi possivel concluir a operação."
            );
        }

        // Devolve JavaScript para quem chamou.
        return resultado;
    },

    // Executa uma requisição e trata possíveis problemas de conexão
    //com o backend.
    async requisitar(opcoes = {}) {
        let resposta;

        try {
            /**
             * o fetch() envia a requisição para a API.
             * 
             * O segundo argumento contém as opções,
             * como método, cabeçalhos e corpo.
             */
            resposta = await fetch(
                AlunoService.URL_API,
                opcoes
            );
        } catch(erro) {
            // executa quando não for possível estabelecer comunicação.
            throw new Error(
                "Não foi possível conectar ao servidor."
            );
        }
        return AlunoService.processarResposta(resposta);
    },

    /**
     * Solicita a lista de Alunos.
     * 
     * Como GET é o método padrao de fetch(),
     * poderiamos omitir a propriedade method.
     * Ela foi mantida para deixar o código explícito.
     */
    async listar() {
        const resultado = await AlunoService.requisitar({
            method: "GET",
            // informa que o cliente espera receber JSON.
            headers: {
                "Accept": "application/json"
            }
        });

        // O service retorna somente o array.
        return resultado.dados;
    },

    // Envia os dados de um novo aluno para a API.
    async cadastrar(aluno) {
        return AlunoService.requisitar({
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            // convert o objeto JavaScript para texto JSON.
            body: JSON.stringify(aluno)
        });
    }
};