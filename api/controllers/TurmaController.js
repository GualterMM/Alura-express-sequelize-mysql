const database = require("../models/index.js")

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
}

module.exports = TurmaController