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
 * basicamente coordena todo mundo.
 */
const AlunoController = {
    
    /**
     * Método que inicia o funcionamento da aplicação.
     * 
     * Quando esse método for chamado, o processo de cadastro
     * começa e continuará enquando o usuário desejar.
     */
    async iniciar() {
        
        AlunoView.iniciar();

        // configura o evento de envio do formulário.
        AlunoView.configurarFormulario(
            AlunoController.cadastrar
        );

        AlunoView.exibirMensagem(
            "Carregando alunos...",
            "informacao"
        );

        try {
            // consulta alunos existentes.
            await AlunoController.atualizarVisualizacao();

            AlunoView.exibirMensagem(
                "Dados carregados com sucesso.",
                "sucesso"
            );
        } catch(erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }
    },

    async cadastrar(evento) {
        //evita o recarregamento da página.
        evento.preventDefault();

        //solicita à View os valores do formulário.
        const dadosInformados = AlunoView.lerDados();

        // encaminha os dados para a validação inicial.
        const validacao = AlunoModel.validar(
            dadosInformados
        );
        
        //interrompe o processo se a validaçao encontrar problema.
        if (!validacao.sucesso) {
            AlunoView.exibirMensagem(
                validacao.mensagem,
                "erro"
            );

            return;
        }

        AlunoView.alteraEstadoFormulario(true);
        
        AlunoView.exibirMensagem (
            "Enviando dados para o servidor...",
            "informacao"    
        );

        try {
            // envia para o backend.
            const resultado =
                await AlunoService.cadastrar(
                    validacao.dados
                );
            
            await AlunoController.atualizarVisualizacao();
            AlunoView.limparFormulario();

            //apresenta a mensagem devolvida pela API.
            AlunoView.exibirMensagem(
                resultado.mensagem,
                "sucesso"
            );
        } catch(erro) {
            // Apresenta erros de validação da API.
            AlunoView.exibirMensagem(
                erro.mensagem,
                "erro"
            );
        } finally {
            // esse bloco sempre vai ser executado com erro ou não.
            AlunoView.alteraEstadoFormulario(false);
        }
    },

    
    async atualizarVisualizacao() {
        //aguarda o Service consultar o backend.    
        const alunos = await AlunoService.listar();
        //atualiza a tabela.
        AlunoView.exibirLista(alunos);
        // atualiza o JSON.
        AlunoView.exibirJson(alunos);
    }
};

AlunoController.iniciar();
