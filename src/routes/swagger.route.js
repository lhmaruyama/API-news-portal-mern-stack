import {Router} from "express"

const router = Router()

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json" assert {type:"json"}

 router.use("/", swaggerUi.serve) //definindo o serve do swagger na rota

 router.get("/", swaggerUi.setup(swaggerDocument)) //executa o arquivo swagger.json importado como "swaggerDocument" dentro do swagger-ui-express

 export default router