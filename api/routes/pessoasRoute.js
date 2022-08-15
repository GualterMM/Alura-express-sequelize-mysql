const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController.js')

const router = Router()

router
  .get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegarUmaMatriculaPorId)
  .get('/pessoas/:id', PessoaController.pegarUmaPessoaPorId)
  .get('/pessoas', PessoaController.pegarTodasAsPessoas)
  .post('/pessoas/:estudanteId/matricula', PessoaController.criarMatricula)
  .post('/pessoas', PessoaController.criarPessoa)
  .put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizarMatriculaPorId)
  .put('/pessoas/:id', PessoaController.atualizarPessoaPorId)
  .delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.removerMatriculaPorId)
  .delete('/pessoas/:id', PessoaController.apagarPessoaPorId)

module.exports = router