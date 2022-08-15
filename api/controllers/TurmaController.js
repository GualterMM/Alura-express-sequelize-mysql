const database = require("../models/index.js")
const { Op } = require("sequelize");

class TurmaController {
    static async criarTurma(req, res){
        const turma = {
            ...req.body,
             createdAt: Date.now(),
             updatedAt: Date.now()
            }

        let response

        try{
            const novaTurma = await database.Turmas.create(turma)
            response = res.status(200).json(novaTurma)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async pegarTodasAsTurmas(req, res){
        let response

        try{
            const turmas = await database.Turmas.findAll()
            response = res.status(200).json(turmas)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarTurmasPorIntervalo(req, res){
        const { data_inicial, data_final } = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        let response

        try{
            const turmas = await database.Turmas.findAll({where})
            response = res.status(200).json(turmas)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarTurmaPorId(req, res){
        const {id} = req.params
        let response

        try{
            const turma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            if(turma !== null){
                response = res.status(200).json(turma)
            } else{
                response = res.status(404).json({"message": "Turma não encontrada"})
            }
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async atualizarTurmaPorId(req, res){
        const {id} = req.params
        const turma = {...req.body, updatedAt: Date.now()}
        let response

        try{
            const atualizacao = await database.Turmas.update(turma, {
                where: {
                    id: Number(id)
                }
            })

            if(atualizacao !== 1){
                response = res.status(200).json({"message": "Turma atualizada."})
            } else{
                response = res.status(404).json({"message": "Turma não encontrada."})
            }
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
        
    }

    static async removerTurmaPorId(req, res){
        const {id} = req.params
        let response

        try{
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            })

            response = res.status(200).json({"message": "Cadastro apagado com sucesso."})
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async pegarMatriculasPorTurma(req, res){
        const {turmaId} = req.params
        let response

        try{
            const matriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            response = res.status(200).json(matriculas)
        } catch(err){
            response = res.status(400).json(err.message)
        } finally{
            return response
        }

    }
}

module.exports = TurmaController