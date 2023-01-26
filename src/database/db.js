//const mongoose = require("mongoose") //mongoose traz funções que podemos usar para conectar com nosso banco de dados
import mongoose from "mongoose"

// ao tentar conectar pelo driver "node.js version 4.1 or later" o link não funcionou, usei a "version 2.2.12 or later"
const connectDatabase = () => {
    console.log("Wait connecting to the database")
    mongoose.set('strictQuery', false) //um aviso sugere executar esse codigo: DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
    mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error))
}
// a função connect é uma promisse, que acessa outro servidor(não é o local, mas o MongoDB Atlas), por isso é uma função assincrona

//module.exports = connectDatabase
export default connectDatabase

//useNewUrlParser: true,
//,{useNewUrlParser: true, useUnifiedTopology: true }
//MONGODB_URI = "mongodb://newsportal:hemaru@ac-rgz6cad-shard-00-00.bxe8imv.mongodb.net:27017,ac-rgz6cad-shard-00-01.bxe8imv.mongodb.net:27017,ac-rgz6cad-shard-00-02.bxe8imv.mongodb.net:27017/?ssl=true&replicaSet=atlas-140vu9-shard-0&authSource=admin&retryWrites=true&w=majority"