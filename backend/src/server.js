/**
 * importa a aplicação Express configurada
 * no arquivo app.js.
 */
import app from "./app.js";

/**
 * utiliza a porta definida pelo ambiente ou a porta 3000
 * durante o densenvolvimento.
 */
const PORTA = Number(process.env.PORT) || 3000;
// define o endereço em que o servidor aceitará conexões.
const HOST = "0.0.0.0";

// inicia a aplicação Express.
app.listen(PORTA, HOST, () => {
    console.log(
        `Servidor Express disponivel em ` +
        `http://localhost:${PORTA}`
    );
});