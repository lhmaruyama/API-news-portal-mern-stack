const userService = require("../services/user.service")
const mongoose = require("mongoose")

const create = async (req, res) => {
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

}

const findAll = async (req, res) => {

    const users = await userService.findAllService()

    if (users.length === 0){
        return res.status(400).send({message: "There are no no registered users"})
    }

    res.send(users)

}

const findById = async (req, res) => {

    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Invalid ID"})
    }

    const user = await userService.findById(id)

    if (!user){
        return res.status(400).send({message: "User not found"})
    }

    res.send(user)

}

module.exports = {create,findAll, findById}




/* const soma = (req, res) => {
    const soma = 1 + 1
    res.send({soma: soma})
}

module.exports = {soma} */