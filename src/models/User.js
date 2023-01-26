//o nome User.js com letra maíscula é padrão de escrita de boas práticas
//esse model limita como os dados são criados no banco de dados, após passar pela primeira verificação com o if no user.controller.js
//a partir das configurações abaixo, ocorre uma validação dos dados mas agora no backend
//tipa o dado (type), exige que o dado não seja vazio(required) e e que o dado seja único, exclusivo no caso do email (unique)

//const mongoose = require("mongoose")
import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //impede o banco de dados de retornar a senha numa requisição
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

UserSchema.pre("save", async function (next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
//a função pre com metodo "save" do mongoose serve para executar um codigo antes de salvar as informações, neste caso vamos criptografar a senha digitada pelo usuario
//o metodo hash vai criar uma string alfanumerica a partir de varios processos matematicos, e o 10 é salt(buffer), ou seja a quantidade de rodadas de criptografias
// um salt menor que 10 não é bom, mas se aumentar muito o sistema vai ficar lento

const User = mongoose.model("User", UserSchema)

//module.exports = User
export default User