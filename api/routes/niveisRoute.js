const { Router } = require('express')
const NivelController = require('../controllers/NivelController.js')

const router = Router()

router
  .post('/niveis', NivelController.criarNivel)
  .get('/niveis', NivelController.pegarTodosOsNiveis)
  .get('/niveis/:id', NivelController.pegarNivelPorId)
  .put('/niveis/:id', NivelController.atualizarNivelPorId)
  .delete('/niveis/:id', NivelController.removerNivelPorId)

module.exports = router