const express = require("express")
const pessoas = require("./pessoasRoute.js")
const niveis = require("./niveisRoute.js")
const turmas = require("./turmasRoute.js")
const matriculas = require("./matriculasRoute.js")

module.exports = app => {
    app.use(
        express.json(),
        pessoas,
        niveis,
        turmas,
        matriculas
        )
    app.get('/', (req, res) => {
        res.status(200).send("Olá!")
    })

    
}