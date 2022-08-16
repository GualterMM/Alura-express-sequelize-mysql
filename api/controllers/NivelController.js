const database = require("../models/index.js")
const NiveisServices = require('../services/Services')
const niveisService = new NiveisServices('Niveis')

class NivelController {
    static async criarNivel(req, res){
        const nivel = {
            ...req.body,
             createdAt: Date.now(),
             updatedAt: Date.now()
            }

        let response

        try{
            const novoNivel = await niveisService.criarRegistro(nivel)
            response = res.status(200).json(novoNivel)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async pegarTodosOsNiveis(req, res){
        let response

        try{
            const niveis = await niveisService.pegarTodosOsRegistros()
            response = res.status(200).json(niveis)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }

    }

    static async pegarNivelPorId(req, res){
        const {id} = req.params
        let response

        try{
            const nivel = await niveisService.pegarUmRegistro(id)

            if(nivel !== null){
                response = res.status(200).json(nivel)
            } else{
                response = res.status(404).json({"message": "Nível não encontrado"})
            }
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }

    static async atualizarNivelPorId(req, res){
        const {id} = req.params
        const nivel = {...req.body, updatedAt: Date.now()}
        let response

        try{
            const atualizacao = await niveisService.atualizarRegistro(nivel, id)

            if(atualizacao !== 1){
                response = res.status(200).json({"message": "Nível atualizado."})
            } else{
                response = res.status(404).json({"message": "Nível não encontrado."})
            }
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
        
    }

    static async removerNivelPorId(req, res){
        const {id} = req.params
        let response

        try{
            await niveisService.removerRegistro(id)
            response = res.status(200).json({"message": "Cadastro apagado com sucesso."})
            
        } catch(err){
            response = res.status(500).json(err.message)
        } finally {
            return response
        }
    }
}

module.exports = NivelController