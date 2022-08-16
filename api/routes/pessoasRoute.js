const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController.js')

const router = Router()

router
  .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegarUmaMatriculaPorId)
  .get('/pessoas/:estudanteId/matricula', PessoaController.pegarMatriculasPorPessoa)
  .get('/pessoas/todos', PessoaController.pegarTodasAsPessoas)
  .get('/pessoas/:id', PessoaController.pegarUmaPessoaPorId)
  .get('/pessoas', PessoaController.pegarPessoasAtivas)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoaPorId)
  .post('/pessoas', PessoaController.criarPessoa)
  .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatriculaPorId)
  .put('/pessoas/:estudanteId/cancela', PessoaController.desativarPessoaPorId)
  .put('/pessoas/:id', PessoaController.atualizarPessoaPorId)
  .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.removerMatriculaPorId)
  .delete('/pessoas/:id', PessoaController.apagarPessoaPorId)

module.exports = router