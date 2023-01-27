import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import userService from "../services/user.service.js"

dotenv.config()

export const authMiddleware = (req, res, next) => { 
    try{
        //só o usuário pode criar uma news, o sistema vai identificar o usuario pelo token, pois dentro do token tem o id do usuario
        //{authorization} = req.headers é uma configuração do token feito no Headers (Authorization = bearer TOKEN), é aqui que vamos permitir o usuario criar uma news
        //então, passamos o token pelo headers na nossa requisição, caso seja encontrado o token criado qdo o usuario logou, então é criado a news
        const {authorization} = req.headers
        //console.log(authorization)

        if (!authorization){
            return res.send(401)
        }

        const parts = authorization.split(" ")

        const [schema, token] = parts

        if(parts.length !== 2){
            return res.send(401)
        }

        if(schema !== "Bearer"){
            return res.send(401)
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded)=>{

            if (error){
                return res.status(401).send({message: "Token invalid"})
            }

            //console.log(decoded)
            
            const user = await userService.findByIdService(decoded.id)
            //console.log("decoded " + decoded)
            //console.log("decoded.id " + decoded.id)
            //console.log("user " + user)
            //console.log("user.id " + user.id)
            
            if(!user || !user.id){
                return res.status(401).send({message: "Invalid Token"})
            }
            
            req.userId = user.id
            console.log("req.UserId: " + req.userId)

            //next()
            return next()
        });
        

    }catch(err){
        res.status(500).send({message: err.message})
    }
}