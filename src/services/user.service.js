// a rota se comunica com o controller que executa uma logica e manda a informação para o service
//o user.service.js é mais um modulo que recebe o dado do body e envia para o banco a partir de um Schema(padrão ou tipo ou configuração)
//(body)=> User.create(body) o create é uma função do mongoose que cria o documento no banco de dados, segundo um formato definido em User e recebido pelo body
//find e findById são funções do mongoose

const User = require("../models/User")

const createService = (body)=> User.create(body)

const findAllService = ()=> User.find()

const findById = (id)=> User.findById(id)

module.exports = {createService, findAllService, findById}