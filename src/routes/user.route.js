const route = require("express").Router() //Router possibilita criar fora do arquivo

const userController = require("../controllers/user.controller")

//route.get("/",userController.soma)

route.post("/", userController.create)

module.exports = route