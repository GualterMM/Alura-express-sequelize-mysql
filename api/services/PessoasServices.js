const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services{
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    
    // Métodos específicos do controlador de Pessoas
    async pegarRegistrosAtivos(where = {}){
        return await database[this.nomeDoModelo].findAll({
            where: {
                ...where
            }
        })
    }

    async pegarTodosOsRegistros(where = {}){
        return await database[this.nomeDoModelo].scope('todos').findAll({
            where: {
                ...where
            }
        })
    }

    async cancelarPessoaEMatriculas(estudanteId){
        return database.sequelize.transaction(async t => {
            await super.atualizarRegistro({ativo: false}, estudanteId, {transaction: t})
            await this.matriculas.atualizarRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, {transaction: t})
        })
    }
}

module.exports = PessoasServices