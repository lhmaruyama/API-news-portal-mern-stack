//const userService = require("../services/user.service")
//const mongoose = require("mongoose")

import userService from "../services/user.service.js"

//try/catch aumenta o nivel de resposta da nossa API para o nosso client
//antes de executar o código de requisão é feito um teste pra saber se é possivel executar a solicitação para o banco
//por exemplo, o servidor pode estar com problemas ou fora do ar, e não conseguir responder às nossoas requisições
//entao o ideal é fazer a requisição depois que é realizado o teste 
//esse teste é feito usando try/catch

const create = async (req, res) => {
try{
    //const user = req.body
    const {name, username, email, password, avatar, background} = req.body
    //console.log(user)
    //res.json("Hello")

    if (!name || !username || !email || !password || !avatar || !background){
        //res.send({message:"Submit all fields for registration"})

        res.status(400).send({message:"Submit all fields for registration"}) //Status 400: erro de requisição no client
    }

    //res.json(user)

    //res.json("OK")

    const user = await userService.createService(req.body)
    // o await pausa a execução dos codigos abaixo e aguarda a resposta do userService.create(req.body) para poder continuar
    // a função create é uma função assincrona por isso deve indicar o async
    //para funcções assincronas, pode usar o async/await ou o .then().cath()

    if (!user){
        return res.status(400).send({message: "Error creating User"})
    }

    //quando a chave e o valor do objeto tem o mesmo nome, posso omitir o um deles, se o valor for um parametro
    res.status(201).send({ //status 201: created
        message: "User created successfully",
        user:{
            id: user._id, // pegando o id gerado pelo banco de dados usa o "._id"
            name,
            username,
            email,
            avatar,
            background
        }
    })

}catch(err){
    res.status(500).send({message: err.message})
}

}

const findAll = async (req, res) => {
try{

    const users = await userService.findAllService()

    if (users.length === 0){
        return res.status(400).send({message: "There are no no registered users"})
    }

    res.send(users)

}catch(err){
    res.status(500).send({message: err.message})
}

}

const findById = async (req, res) => {
try{

    //const id = req.params.id
    //const id = req.id
    
/*  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Invalid ID"})
    }
*/

    //const user = await userService.findByIdService(id)
    const user = req.user

/*  
    if (!user){
        return res.status(400).send({message: "User not found"})
    }
*/

    res.send(user)

}catch(err){
    res.status(500).send({message: err.message})
}

}

const update = async (req, res) => {

try{

    const {name, username, email, password, avatar, background} = req.body

    if (!name && !username && !email && !password && !avatar && !background){

        res.status(400).send({message:"Submit at least one field for update"})

    }

    //const id = req.params.id 
    //const id = req.id
    const {id, user} = req

/*  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Invalid ID"})
    }
*/

    //const user = await userService.findByIdService(id)

/*  
    if (!user){
        return res.status(400).send({message: "User not found"})
    }
*/
    await userService.updateService(
        id,
        name, 
        username, 
        email, 
        password, 
        avatar, 
        background
    )

    res.send({message: "User successfully updated"})

}catch(err){
    res.status(500).send({message: err.message})
}

}

//module.exports = {create, findAll, findById, update}
export default {create, findAll, findById, update}



/* const soma = (req, res) => {
    const soma = 1 + 1
    res.send({soma: soma})
}

module.exports = {soma} */