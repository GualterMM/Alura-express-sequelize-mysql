const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()

class MatriculaController {
    // TODO: Testar os métodos
    static async pegarUmaMatriculaPorId(req, res) {
        const { estudanteId, matriculaId } = req.params
        let response

        try {
            const matricula = await matriculasServices.pegarMatriculaPorId(estudanteId, matriculaId)
            response = res.status(200).json(matricula)
        } catch (err) {
            response = res.status(400).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarMatriculasPorPessoa(req, res) {
        const { estudanteId } = req.params
        let response

        try {
            const matriculas = await matriculasServices.pegarMatriculaPorPessoa(estudanteId)
            response = res.status(200).json(matriculas)
        } catch (err) {
            response = res.status(400).json(err.message)
        } finally {
            return response
        }

    }

    static async criarMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = {
            ...req.body,
            estudante_id: Number(estudanteId),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        let response

        try {
            const novaMatriculaCriada = await matriculasServices.criarRegistro(novaMatricula)
            response = res.status(200).json(novaMatriculaCriada)
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async atualizarMatriculaPorId(req, res) {
        const { estudanteId, matriculaId } = req.params
        const atualizacao = { ...req.body, updatedAt: Date.now() }
        const where = {id: Number(matriculaId), estudante_id: Number(estudanteId)}
        let response

        try {
            const statusAtualizado = await matriculasServices.atualizarRegistros(atualizacao, where)
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

    static async removerMatriculaPorId(req, res) {
        const { estudanteId, matriculaId } = req.params
        const where = {id: Number(matriculaId), estudante_id: Number(estudanteId)}
        let response

        try {
            matriculasServices.removerRegistros(where)
            response = res.status(200).json({ "message": "Cadastro removido com sucesso" })
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }
}

module.exports = MatriculaController