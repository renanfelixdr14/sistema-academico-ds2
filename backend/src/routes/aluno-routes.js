import express from "express";
import AlunoController from "../controller/aluno-controller.js";

/**
 * Cria um roteador específico para alunos.
 * 
 * Um Router pode ser entendido como um 
 * pequeno modulo de rotas.
 */
const router = express.Router();

/**
 * Rota de listagem.
 * Como o Router será registrado no caminho
 * /api/alunos, esta rota representará:
 * GET /api/alunos
 */
router.get(
    "/",
    AlunoController.listar
);

/**
 * Rota de cadastro.
 * Esta rota representará:
 * POST /api/alunos
 */
router.post(
    "/",
    AlunoController.cadastrar
);

// Exporta o Router para o app.js
export default router;