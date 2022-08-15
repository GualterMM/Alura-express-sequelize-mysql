const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController.js')

const router = Router()

router
  .post('/turmas', TurmaController.criarTurma)
  .get('/turmas', TurmaController.pegarTodasAsTurmas)
  .get('/turmas/:id', TurmaController.pegarTurmaPorId)
  .put('/turmas/:id', TurmaController.atualizarTurmaPorId)
  .delete('/turmas/:id', TurmaController.removerTurmaPorId)

module.exports = router