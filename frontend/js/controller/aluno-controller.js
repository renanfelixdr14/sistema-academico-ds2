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
        
        AlunoView.inicializar();

        AlunoView.configurarFormulario(
            function (dados) {
                AlunoController.cadastrar(dados);
            }
        );

        AlunoView.configurarBotaoLimpar(
            function () {
                AlunoController.limparDados();
            }
        );

        //apresenta dados já armazenados.
        AlunoController.atualizarVisualizacao();
    },

    cadastrar(dados) {
        
        const resultado = AlunoModel.cadastrar(dados);
        
        if (!resultado.sucesso) {
            AlunoView.exibirErro(resultado.mensagem);
            return;
        }

        AlunoView.exibirSucesso (
            `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`
        );

        AlunoView.LimparFormulario();
        AlunoController.atualizarVisualizacao();
    },

    limparDados() {
        const alunos = AlunoService.listar();

        if (alunos.length === 0) {
            AlunoView.exibirErro(
                "Não existem alunos para remover."
            );
            return;
        }

        const confirmou = AlunoView.confirmarLimpeza();

        if (!confirmou) {
            return;
        }

        AlunoService.limpar();
        AlunoView.exibirSucesso(
            "Todos os alunos foram removidos."
        );

        AlunoController.atualizarVisualizacao();
    },

    atualizarVisualizacao() {
        
        const alunos = AlunoModel.listar();
        
        AlunoView.exibirLista(alunos);

        const textoJson = JSON.stringify(aluno, null, 2);

        AlunoView.exibirJson(textoJson);
    }
};

AlunoController.iniciar();
