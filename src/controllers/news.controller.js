
import {createService, findAllService, countNews} from "../services/news.service.js"

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
            user: req.userId,
        })
        //user: { _id: "63d2e31484ffc60af11af016" },

        res.send(201)

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

const findAll = async (req, res) => {
    
    try{
        let {limit, offset} = req.query
        //paginação
        limit =  Number(limit)
        offset = Number(offset)

        if(!limit){
            limit = 5
        }

        if(!offset){
            offset = 0
        }

        const news = await findAllService(offset,limit)
        const total = await countNews()
        const curruntUrl =  req.baseUrl
        console.log(total)

        const next = offset + limit
        const nextUrl = next < total ? `${curruntUrl}?limit=${limit}&offset=${next}` : null
        
        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${curruntUrl}?limit=${limit}&offset=${previous}` : null


        if (news.length === 0){
            return res.status(400).send({message: "There are no registered news"})
        }
        
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item =>({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,

            }))
        })  

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

export { create, findAll}