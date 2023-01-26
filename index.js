//console.log("Servidor Iniciado")
//app.use("/soma", userRoute)

//const express = require('express')
//const connectDatabase = require("./src/database/db")
//const userRoute = require("./src/routes/user.route")

//o require é a forma CommonJS de importação (antiga)
//o import from é a forma ES Modules de importação (mais moderna)
//é necessário incluir "type": "module" no package.json

import express from 'express'
import connectDatabase from "./src/database/db.js"
import userRoute from "./src/routes/user.route.js"
import dotenv from "dotenv"
dotenv.config()

const app = express()

//const port = 3000
const port = process.env.PORT || 3000
//process.env.PORT é a variavel global que guarda a porta padrão de qualquer servidor

connectDatabase()

app.use(express.json()) //manda o documento para o banco de dados no formato json

app.use("/user", userRoute)

app.listen(port, ()=> console.log(`Servidor rodando na porta ${port}`))













//Rota: método + nome + function(callback)

/* app.get('/', (req, res) => {
  res.send('Hello World News Portal iniciado')
}) */

/* app.get('/soma', (req, res) => {
    const soma = 1 + 1
    res.json(soma)
  }) */
  
  
/*   app.get('/soma', (req, res) => {
    const soma = 1 + 1
    res.send({soma: soma})
}) */
    
    
//http://localhost:3000/
//app.listen(3000)