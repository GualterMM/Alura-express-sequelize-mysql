const database = require('../models/index.js')
const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

// TODO: Implementar services para os métodos não colapsados e para as matrículas (provavelmente migrar)
class PessoaController {
    static async pegarPessoasAtivas(req, res) {
        let response

        try {
            const pessoas = await pessoasServices.pegarRegistrosAtivos()
            response = res.status(200).json(pessoas)
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarTodasAsPessoas(req, res) {
        let response

        try {
            const pessoas = await pessoasServices.pegarTodosOsRegistros()
            response = res.status(200).json(pessoas)
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarUmaPessoaPorId(req, res) {
        const { id } = req.params
        let response

        try {
            const pessoa = await pessoasServices.pegarUmRegistro(id)
            response = res.status(200).json(pessoa)
        } catch (err) {
            response = res.status(400).json(err.message)
        } finally {
            return response
        }

    }

    static async criarPessoa(req, res) {
        const novaPessoa = {
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        let response

        try {
            const novaPessoaCriada = await pessoasServices.criarRegistro(novaPessoa)
            response = res.status(200).json(novaPessoaCriada)
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async atualizarPessoaPorId(req, res) {
        const { id } = req.params
        const atualizacao = { ...req.body, updatedAt: Date.now() }
        let response

        try {
            const statusAtualizado = await pessoasServices.atualizarRegistro(atualizacao, id)

            if (statusAtualizado == 1) {
                response = res.status(200).json({ "message": "Cadastro atualizado com sucesso" })
            } else {
                response = res.status(400).json({ "message": "Falha ao atualizar cadastro" })
            }

        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async desativarPessoaPorId(req, res) {
        const { estudanteId } = req.params
        let response

        try {
            await pessoasServices.cancelarPessoaEMatriculas(estudanteId)
            response = res.status(200).json({"message": `Cadastro referente ao id ${estudanteId} desativo`})
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async apagarPessoaPorId(req, res) {
        const { id } = req.params
        let response

        try {
            await pessoasServices.removerRegistro(id)
            response = res.status(200).json({ "message": `Cadastro com id ${id} apagado com sucesso` })
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async restauraPessoaPorId(req, res) {
        const { id } = req.params
        let response

        try {
            await pessoasServices.restaurarRegistro(id)
            response = res.status(200).json({ "message:": "Usuário restaurado" })
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

}

module.exports = PessoaController