import User from "../models/User.js"
import jwt from "jsonwebtoken"

const loginService = (email) => User.findOne({email: email}).select("+password")
// o .select("+password") serve para trazer o password na minha resposta, pois no Schema foi definido como select: false

//const generateToken = (id, email) => jwt.sign({id: id, email: email}, process.env.SECRET_JWT,{expiresIn: 86400})
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT,{expiresIn: 86400})

//process.env.SECRET_JWT é a variavel de ambiente (global) que armazena o hash criado no MD5
//expiresIn: 86400 é o tempo em segundos (24h) que a sessão irá expirar

export {loginService, generateToken}