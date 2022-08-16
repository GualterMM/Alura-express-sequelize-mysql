const { response } = require('express')
const database = require('../models/index.js')

class PessoaController {
    static async pegarPessoasAtivas(req, res) {
        let response

        try {
            const pessoas = await database.Pessoas.findAll()
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
            const pessoas = await database.Pessoas.scope('todos').findAll()
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
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

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
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
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
            const statusAtualizado = await database.Pessoas.update(atualizacao, {
                where: {
                    id: Number(id)
                }
            })

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

        database.sequelize.transaction(async t => {
            await database.Pessoas
                .update({ ativo: false },{ where: { id: Number(estudanteId) } },
                { transaction: t })
            await database.Matriculas
                .update({ status: 'cancelado'}, { where: { estudante_id: estudanteId } },
                { transaction: t })
            response = res.status(200).json({"message": `Cadastro referente ao id ${estudanteId} desativo`})
        })

        try {
            
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
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })

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
            await database.Pessoas.restore({
                where: {
                    id: Number(id)
                }
            })

            response = res.status(200).json({ "message:": "Usuário restaurado" })
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async pegarUmaMatriculaPorId(req, res) {
        const { estudanteId, matriculaId } = req.params
        let response

        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

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
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(estudanteId)
                }
            })
            const matriculas = await pessoa.getAulasMatriculadas()

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
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
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
        let response

        try {
            const statusAtualizado = await database.Matriculas.update(atualizacao, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

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
        let response

        try {
            database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            response = res.status(200).json({ "message": "Cadastro removido com sucesso" })

        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }
}

module.exports = PessoaController