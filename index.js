//console.log("Servidor Iniciado")
//app.use("/soma", userRoute)

const express = require('express')
const app = express()

const connectDatabase = require("./src/database/db")

const userRoute = require("./src/routes/user.route")

const port = 3000

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