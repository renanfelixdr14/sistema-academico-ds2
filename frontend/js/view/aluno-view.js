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

    /*
    * Solicita os dados ao usuário necessarios para ir para o model.
    * 
    * Cada chamada de prompt() apresenta uma caixa de entrada e devolve
    * o valor digitado pelo usuário.
    * 
    */
   lerDados() {
    return {
        ra: prompt("Digite o RA do aluno:"),
        nome: prompt("Digite o Nome do aluno:"),
        email: prompt("Digite o e-mail do aluno:"),
        curso: prompt("Digite o curso do aluno:"),
        turma: prompt("Digite a turma do aluno:")
    };
   },

   /*
   * Apresenta se o aluno foi cadastrado com sucesso.
   * O parâmetro aluno recee o objeto criado pelo Model e ecaminhado pelo Controller.
   * 
   */
   exibirAluno(aluno) {
    
    // Apresenta uma mensagem simples no console.
    console.log("Aluno cadastrado com sucesso.");
    /*
    * console.table() apresenta os dados em tabela
    * facilitando a leitura dos dados.
    */
    console.table(aluno);
   },

   /*
   * Apresenta mensagem de erro.
   *
   * A View não descobre nem cria o erro.
   * Ela apenas apresenta a mensagem recebida.
   * 
   * A Mensagem vai ser mandada pelo controller, depois do Model validar.
   */
   exibirErro(mensagem) {
    
    /*
    * console.error() apresenta a mensagem como erro,
    * dependendo do navegador a mensagem poderá aparecer em vermelho
    * ou acompanhada de um ícone de alerta.
    */
    console.error("Erro:", mensagem);
   },

   /* 
    Perguntar se o usuário deseja realizar outro cadastro

    Confirm(), Esse valor será utilizado pelo Controller para decidir
    se o processo de cadastro deverá continuar.
   */
   perguntarNovoCadastro() {
    return confirm("Deseja cadastrar outro aluno?");
   },

   // o parâmetro alunos deverá receber um array.
   exibirLista(alunos) {

        // O lenght informa a quantidade de elementos existentes no array.
        console.log(
            "Quantidade de alunos cadastrados:",
            alunos.length
        );
        
        // verifica se o array está vazio, se 0 nenhum está cadastrado.
        if (alunos.lenght === 0) {
            console.log("Nenhum aluno foi cadastrado.");
            // utiliza aqui para o console.table() não é executado sem cadastros.
            return;
        }

        // se o array possuir cadastros, apresenta o registros em tabela.
        console.table(alunos);
   },

   // Apresenta os alunos convertidos para o formato Json
   // O parâmetro textoJson recebe uma string criada anteriormente por JSON.stringify().
   exibirJson(textoJson) {
    console.log("Alunos em formato JSON:");

    /**
     * Neste momento, o conteúdo apresentado é texto, Ele não
     * é mais um array que possa ser manipulado diretamente
     * pelo JavaScript.
     */
    console.log(textoJson);
   },

   /**
    * Apresenta os dados reconstruídos com JSON.parse().
    * 
    * Depois da conversão, os textos JSON voltam a ser valores JavaScript.
    * 
    */
    exibirDadosRecuperados(dados) {
        console.log("Dados reconstruídos com JSON.parse():");

        /**
         * Como dados voltaram a ser uma array de objetos,
         * podemos apresentá-lo com console.table().
         */
        console.table(dados);
    }
};