
import {createService, findAllService} from "../services/news.service.js"

const create = async (req, res) => {
    try{
        const {title, text, banner} = req.body

        if(!title || !banner || !text){
            res.status(400).send({message:"Submit all fields for registration"})
        }

        await createService({
            title,
            text,
            banner,
            user: { _id: "63d2e31484ffc60af11af016" },
        })

        res.send(201)

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

const findAll = async (req, res) => {
    
    try{
        
        const news = await findAllService()
        res.send(news)    
        
        if (news.length === 0){
            return res.status(400).send({message: "There are no registered news"})
        }
        
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export {create, findAll}