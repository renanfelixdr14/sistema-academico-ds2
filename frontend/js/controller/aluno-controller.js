/**
 * CONTROLLER DE ALUNOS
 * 
 * O Controller coordena o funcionamento da aplicação.
 * Responsavel:
 * - solicitar dados à View;
 * - enviar os dados ao Model;
 * - receber o resultado do Model;
 * - decidir qual método da View será executado;
 * - controlar a repetição dos cadastros;
 * - coordenar a conversão dos dados para JSON.
 * 
 */
const AlunoController = {
    
    /**
     * Método que inicia o funcionamento da aplicação.
     * 
     * Quando esse método for chamado, o processo de cadastro
     * começa e continuará enquando o usuário desejar.
     */
    iniciar() {
        
        let continuar = true;

        while (continuar) {

            /**
             * Solicita que a View leia os dados do usuário.
             * lerDados() devolve um objeto com:
             * - RA;
             * - nome;
             * - e-mail;
             * - curso;
             * - turma.
             * 
             * O controller não vai utilizar prompt diretamente.
             */
            const dados = AlunoView.lerDados();

            /**
             * Envia os Dados para o Model.
             * devolve um objeto informado se a operação foi bem-sucedida.
             */
            const resultado = AlunoModel.cadastrar(dados);

            // Verifica a propriedade de sucesso.
            if (resultado.sucesso) {
                //solicita que a View apresenta o aluno.
                AlunoView.exibirAluno(resultado.aluno);
            } else {
                AlunoView.exibirErro(resultado.mensagem);
            }

            continuar = AlunoView.perguntarNovoCadastro();
        }

        const alunos = AlunoModel.Listar();
        AlunoView.exibirLista(alunos);

        /**
         * Converte alunos em JSON, não será aplicado filtro,
         * quantidade de numeros na indentação, a indentação
         * deixa o JSON mais fácil de ler.
         */
        const textoJson = JSON.stringify(alunos, null, 2);

        /**
         * Neste momento, textoJson é uma string.
         * Ele não é mais um array que possa ser manipulado.
         * diretamente como a lista original.
         */
        AlunoView.exibirJson(textoJson);

        /**
         * Converte o texto JSON novamente em um valor JavaScript.
         * 
         * Como JSON foi criado a partir de um array,
         * JSON.parse() produzirá um novo array de objetos.
         */
        const dadosRecuperados = JSON.parse(textoJson);
        AlunoView.exibirDadosRecuperados(dadosRecuperados);
    }
};

// Sem isso o cadastro será executado
AlunoController.iniciar();