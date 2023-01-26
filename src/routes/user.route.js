//const router = require("express").Router() //Router possibilita criar fora do arquivo
//const userController = require("../controllers/user.controller")
//const { validId, validUser } = require("../middlewares/global.middlewares")

import express from "express"
import userController from "../controllers/user.controller.js"
import {validId, validUser} from "../middlewares/global.middlewares.js"
const router = express.Router()

//router.get("/",userController.soma)

router.post("/", userController.create)
router.get("/", userController.findAll) //rota sem id pega todos os usuarios

/*  
route.get("/:id", userController.findById) //rota com parametro id especifico pega aquele documento com id
route.patch("/:id", userController.update)
*/

router.get("/:id", validId, validUser, userController.findById)
router.patch("/:id", validId, validUser, userController.update)

//module.exports = router
export default router