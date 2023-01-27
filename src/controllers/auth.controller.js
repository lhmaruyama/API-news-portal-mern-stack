import bcrypt from "bcrypt"
import {loginService} from "../services/auth.service.js"

const login = async (req, res)=>{
    try{
        const {email, password} = req.body
        
        const user = await loginService(email)
    
        if(!user){
            return res.status(404).send({message: "User or Password not found"})
        }

        //const passwordIsValid = await bcrypt.compare(passaword, user.passaword) ou:
        const passwordIsValid = bcrypt.compareSync(password, user.password)

        //console.log(passwordIsValid)
        if(!passwordIsValid){
            return res.status(400).send({message: "User or Password not found"})
        }

        
        res.send("Login ok")
        //res.send(user)

    }catch (err){
        res.status(500).send(err.message)
    }
}

export {login}