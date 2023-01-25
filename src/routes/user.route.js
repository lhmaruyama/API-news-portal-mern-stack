const route = require("express").Router() //Router possibilita criar fora do arquivo

const userController = require("../controllers/user.controller")

//route.get("/",userController.soma)

route.post("/", userController.create)
route.get("/", userController.findAll) //rota sem id pega todos os usuarios
route.get("/:id", userController.findById) //rota com parametro id especifico pega aquele documento com id
route.patch("/:id", userController.update)

module.exports = route