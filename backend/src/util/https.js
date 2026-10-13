/*
*Esses cabeçalhos permitem que um frontend executando em outro endereço
*faça requisições para o backend.
* Exemplo:
* 
* Frontend: https://127.0.0.1:5500
* Backend: https://localhost:3000
*/
const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};
/* Envia resposta em formato json
* Parametros:
*
* res:
* representa a resposta HTTP que será enviada ao cliente.
* 
* status:
* código de estado da resposta.
* Exemplo: 200, 201, 400, 404 e 500.
* 
* dados:
* objetivo ou array que será convertido para JSON.
*/
export function enviarJson(res, status, dados) {

    const textoJson = JSON.stringify(dados, null, 2);
    /* 
    * writeHead() define:
    *
    * 1. O código de status da resposta;
    * 2. Os cabeçalhos HTTP.
    */
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        // operador que adciona os cabeçalhos CORS ao objeto.
        ...cabecalhosCors
    });
    /**
     * end() finaliza a resposta e envia o conteudo
     * para quem realizou a requisição.
     */
    res.end(textoJson);
}
/**
 * encia uma resposta sem conteúdo.
 * 
 * Essas função será utilizada nas requisições OPTIONS,
 * realizadas automaticamente pelo navegador em 
 * determinadas situações envolvendo CORS.
 */
export function enviarSemConteudo(res) {
    /**
     * O status 204 significa:
     * 
     * "A requisição foi processada com sucesso,
     * mas não existe conteúdo para retornar."
     */
    res.writeHead(204, cabecalhosCors);
    // finaliza a resposta sem enviar um corpo.
    res.end();
}
/**
 * Lê o corpo de uma requisição HTTP e transforma
 * o Json recebido em um objeto JavaScript.
 * 
 * A função assincrona porque o conteúdo da requisição
 * pode chegar ao servidor dividido em várias partes.
 */
export function lerCorpoJson(req) {
    /**
     * Criamos e retornamos uma Promise.
     * 
     * A Promise representa uma operação que será
     * concluida no futuro.
     */
    return new Promise((resolve, reject) => {
        let corpo = "";
        /**
         * O evento "data" é executado semque que uma 
         * nova parte dos dados chega ao Servidor.
         */
        req.on("data", parte => {
            // Cada parte recebida é acrescentada ao corpo.
            corpo += parte;
        });
        /**
         * o evento "end" é executado quando o servidor
         * termina de receber o corpo.
         */
        req.on("end", () => {
            //se estiver vazio, objeto vazio.
            if (corpo.trim() === "") {
                resolve({});
                return;
            } try {
                const dados = JSON.parse(corpo);
                //devolve dados convertidos com sucesso.
                resolve(dados);
            } catch(erro) {
                reject(erro);
            }
        });
        /**
         * esse evento é executado caso aconteça algum
         * problema durante a leitura da requisição.
         */
        req.on("error", error => {
            reject(erro);
        });
    });
}