//console.log("Servidor Iniciado")
//app.use("/soma", userRoute)

//const express = require('express')
//const connectDatabase = require("./src/database/db")
//const userRoute = require("./src/routes/user.route")

//o require é a forma CommonJS de importação (antiga)
//o import from é a forma ES Modules de importação (mais moderna)
//é necessário incluir "type": "module" no package.json

import express from 'express'
import connectDatabase from "./database/db.js"
import dotenv from "dotenv"

import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import newsRoute from "./routes/news.route.js"
import swaggerRoute from "./routes/swagger.route.js"

dotenv.config()

const app = express()

//const port = 3000
const port = process.env.PORT || 3000
//process.env.PORT é a variavel de ambiente global que guarda a porta padrão, é usada pela maioria dos servidores

connectDatabase()

app.use(express.json()) //manda o documento para o banco de dados no formato json

app.use("/user", userRoute)
app.use("/auth", authRoute)
app.use("/news", newsRoute)
app.use("/doc", swaggerRoute)


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