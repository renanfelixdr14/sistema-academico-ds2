/*
* View de Alunos
* 
* A View é responsavel pela interação do usuário.
* 
* Nesta primeira versão, utiliza:
* - prompt() para receber informação;
* - confirm() para fazer uma pergunta;
* - console.log() para apresentar mensagem;
* - console.table() para apresentar objetos e arrays;
* - console.error() para apresentar erros.
* 
* A View não vai validar nem cadastrar e nem armazenar dados, alem de não aplicar regras de negócio.
* Isso o model faz.
*/

const AlunoView = {
    // evita repetir varias vezes getElementById()
    elementos: {},
    inicializar() {
        AlunoView.elementos.formulario =
            document.getElementById("form-aluno");

        AlunoView.elementos.formulario =
            document.getElementById("ra");

        AlunoView.elementos.formulario =
            document.getElementById("nome");

        AlunoView.elementos.formulario =
            document.getElementById("email");

        AlunoView.elementos.formulario =
            document.getElementById("curso");

        AlunoView.elementos.formulario =
            document.getElementById("turma");

        AlunoView.elementos.formulario =
            document.getElementById("mensagem");

        AlunoView.elementos.formulario =
            document.getElementById("corpo-tabela-alunos");

        AlunoView.elementos.formulario =
            document.getElementById("total-alunos");

        AlunoView.elementos.formulario =
            document.getElementById("saida-json");

    },

    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener(
            "submit",
            function (evento) {
                // impede comportamento padrão, no caso recarrgar a pagina
                evento.preventDefault();
                const dados = AlunoView.lerDados();
                aoEnviar(dados);
            }
        );
    },

   lerDados() {
    return {
        ra: AlunoView.elementos.ra.value,
        nome: AlunoView.elementos.nome.value,
        email: AlunoView.elementos.email.value,
        curso: AlunoView.elementos.curso.value,
        turma: AlunoView.elementos.turma.value
    };
   },

   exibirSucesso(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;
    AlunoView.elementos.mensagem.className =
        "mensagem sucesso";
   },

   exibirErro(mensagem) {
    AlunoView.elementos.mensagem.textContent = mensagem;
    AlunoView.elementos.mensagem.className = 
        "mensagem erro";
   },
   
   LimparFormulario() {
    AlunoView.elementos.formulario.reset();
    AlunoView.elementos.ra.focus();
   },

   exibirLista(alunos) {
    const corpoTabela = AlunoView.elementos.corpoTabela;
    corpoTabela.textContent = "";
    AlunoView.elementos.totalAlunos.textContent = 
        `Total: ${alunos.lenght}`;

    if (alunos.lenght === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.textContent = 
            "Nenhum aluno foi cadastrado.";

        linha.appendChild(celula);
        corpoTabela.appendChild(linha);

        return;
    }

    alunos.forEach(
        function (aluno) {
            const linha = document.createElement("tr");
            const valores = [
                aluno.id,
                aluno.ra,
                aluno.nome,
                aluno.email,
                aluno.curso,
                aluno.turma,
                aluno.ativo ? "Ativo" : "Inativo"
            ];

            valores.forEach(
                function (valor) {
                    const celula = document.createElement("td");
                    celula.textContent = valor;
                    linha.appendChild(celula);
                });

                corpoTabela.appendChild(linha);
        });
   },

   exibirJson(textoJson) {
    AlunoView.elementos.saidaJson.textContent = textoJson;
   }
};