/*
* View de Alunos
* 
* A View é responsavel pela interação do usuário.
* 
* Ela lê o formulário, apresenta mensagens,
* atualiza a tabela e exibe o JSON.
*/

const AlunoView = {
    // Armazena refencias ao elementos HTML.
    elementos: {},

    iniciar() {
        AlunoView.elementos.formulario =
            document.querySelector("#form-aluno");

        AlunoView.elementos.ra =
            document.querySelector("#ra");

        AlunoView.elementos.nome =
            document.querySelector("#nome");

        AlunoView.elementos.email =
            document.querySelector("#email");

        AlunoView.elementos.curso =
            document.querySelector("#curso");

        AlunoView.elementos.turma =
            document.querySelector("#turma");

        AlunoView.elementos.mensagem =
            document.querySelector("#mensagem");

        AlunoView.elementos.corpoTabela =
            document.querySelector("#corpo-tabela-alunos");

        AlunoView.elementos.saidaJson =
            document.querySelector("saida-json");

        AlunoView.elementos.botaoSalvar =
            document.querySelector("#botao-salvar");
    },

    // registra a função que será executada quando o formulário for enviado.
    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener(
            "submit",
            aoEnviar
        );
    },

    // Le os valores digitados no formulario.
    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    // Apresenta uma mensagem na interface.
    exibirMensagem(mensagem, tipo) {
        AlunoView.elementos.mensagem.textContent = mensagem;

        AlunoView.elementos.mensagem.className =
            `mensagem ${tipo}` ;
    },
    //cria uma célula na tabela.
    // textContent é utilizado para inserir o texto de forma segura, sem interpreta-lo como HTML.
    criarCelula(valor) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        return celula;
    },

    //Exibe uma lista de Alunos na tabela.
    exibirLista(alunos) {
        // remove as linhas exibidas anteriormente.
        AlunoView.elementos.corpoTabela.innerHTML = "";

        /**
         * se o array estiver vazio, cria uma linha 
         * informando que não existem alunos.
         */
        if (alunos.lenght === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 7;
            celula.textContent =
                "Nenhum aluno cadastrado.";
            linha.appendChild(celula);

            AlunoView.elementos.corpoTabela.appendChild(
                linha
            );
            
            return;
        }

        // Cria uma linha para cada aluno recebido.
        alunos.forEach(aluno => {
            const linha = document.createElement("tr");

            linha.appendChild(
                AlunoView.criarCelula(aluno.id)
            );
            linha.appendChild(
                AlunoView.criarCelula(aluno.ra)
            );
            linha.appendChild(
                AlunoView.criarCelula(aluno.nome)
            );
            linha.appendChild(
                AlunoView.criarCelula(aluno.email)
            );
            linha.appendChild(
                AlunoView.criarCelula(aluno.curso)
            );
            linha.appendChild(
                AlunoView.criarCelula(aluno.turma)
            );
            linha.appendChild(
                AlunoView.criarCelula(
                    aluno.ativo ? "Sim" : "Não"
                )
            );

            AlunoView.elementos.corpoTabela.appendChild(
                linha
            );
        });
    },

    // Exibe os Alunos em formato JSON.
    exibirJson(alunos) {
        AlunoView.elementos.saidaJson.textContent =
            JSON.stringify(alunos, null, 2);
    },

    limparFormulario() {
        AlunoView.elementos.formulario.reset();
        AlunoView.elementos.ra.focus();
    },

    // Altera o estado do formulario durante uma operação assincrona.
    alteraEstadoFormulario(processando) {
        // Impede vários envios enquanto a requisiçao estiver em andamento.
        AlunoView.elementos.botaoSalvar.disabled = 
            processando;
        // modifica o texto apresentado no botão.
        AlunoView.elementos.botaoSalvar.textContent = 
            processando ? "Salvando..." : "Cadastrar aluno";
    }
};