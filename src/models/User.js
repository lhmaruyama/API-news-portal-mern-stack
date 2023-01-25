//o nome User.js com letra maíscula é padrão de escrita de boas práticas
//esse model limita como os dados são criados no banco de dados, após passar pela primeira verificação com o if no user.controller.js
//a partir das configurações abaixo, ocorre uma validação dos dados mas agora no backend
//tipa o dado (type), exige que o dado não seja vazio(required) e e que o dado seja único, exclusivo no caso do email (unique)

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User