const database = require('../models')
const Services = require('./Services')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
        this.pessoasServices = new Services('Pessoas')
    }
    // Métodos específicos do controlador de Matriculas
    async pegarMatriculaPorId(estudanteId, matriculaId) {
        return await database[this.nomeDoModelo].findOne({
            where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }
        })
    }

    // TODO: Tratar quando status da pessoa é cancelado (retorno null)
    async pegarMatriculaPorPessoa(estudanteId){
        const pessoa = await this.pessoasServices.pegarUmRegistro(estudanteId)
        console.log(pessoa);
        return await pessoa.getAulasMatriculadas()
    }
}

module.exports = MatriculasServices