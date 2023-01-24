console.log("Iniciado")
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World News Portal iniciado')
})

app.listen(3000)

//http://localhost:3000/