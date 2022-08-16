const database = require("../models/index.js")
const { Op } = require("sequelize");
const Sequelize = require("sequelize")
const { TurmasServices } = require("../services")
const turmasServices = new TurmasServices

class TurmaController {
    static async criarTurma(req, res){
        const turma = {
            ...req.body,
             createdAt: Date.now(),
             updatedAt: Date.now()
            }

        let response

        try{
            const novaTurma = await turmasServices.criarRegistro(turma)
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
            const turmas = await turmasServices.pegarTodosOsRegistros()
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
            const turmas = await turmasServices.pegarTodosOsRegistrosOnde(where)
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
            const turma = await turmasServices.pegarUmRegistro(id)

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
            const atualizacao = await turmasServices.atualizarRegistro(turma, id)

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
            await turmasServices.removerRegistro(id)

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

    static async pegarTurmasLotadas(req, res){
        const lotacaoTurma = 2
        let response
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })

            response = res.status(200).json(turmasLotadas)
        } catch (err) {
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }
}

module.exports = TurmaController