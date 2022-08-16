// TODO: Testar as rotas

const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController.js')

const router = Router()

router
  .get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegarUmaMatriculaPorId)
  .get('/pessoas/:estudanteId/matricula', MatriculaController.pegarMatriculasPorPessoa)
  .post('/pessoas/:estudanteId/matricula', MatriculaController.criarMatricula)
  .put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizarMatriculaPorId)
  .delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.removerMatriculaPorId)

module.exports = router