import User from "../models/User.js"

const loginService = (email) => User.findOne({email: email}).select("+password")

// o .select("+password") serve para trazer o password na minha resposta, pois no Schema foi definido como select: false

export {loginService}