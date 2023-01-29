
import { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService } from "../services/news.service.js"

const create = async (req, res) => {
    try {

        const { title, text, banner } = req.body

        if (!title || !banner || !text) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }
        await createService({
            title,
            text,
            banner,
            user: req.userId,
        })
        //user: { _id: "63d2e31484ffc60af11af016" },

        res.send(201)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {

    try {
        let { limit, offset } = req.query
        //paginação
        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5
        }

        if (!offset) {
            offset = 0
        }

        const news = await findAllService(offset, limit)
        const total = await countNews()
        const curruntUrl = req.baseUrl
        console.log(total)

        const next = offset + limit
        const nextUrl = next < total ? `${curruntUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${curruntUrl}?limit=${limit}&offset=${previous}` : null


        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item => ({
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

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNews = async (req, res) => {

    try {

        const news = await topNewsService()

        if(!news){
            return res.status(400).send({ message: "There is no registered post" })
        }

        res.send({
            news:{
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findById = async (req, res) => {

    try {
        console.log("ENTROU NO findById-----")
        //const id = "63d3decb4d8c70c3e8373212"
        //const {id} = req.userId
        //const id = req.params.id
        //const id = req.id
        //const user = req.user
        const {id} = req.params
        //console.log(req)
        //o texto "id" precisa ser identico ao que está na rota: "/:id"
        
        const news = await findByIdService(id)
        console.log(news)
        //console.log("news: " + news)
         
 
        return res.send({
            news:{
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
   
        //return res.send(id)



    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const searchByTitle = async (req, res) => {

    try {

        const {title} = req.query
        //o texto "id" precisa ser identico ao que está na rota: "/:id"

        const news = await searchByTitleService(title)
        
        if(news.length === 0){
            return res.status(400).send({ message: "There are no news with this title" })
        }

        return res.send({
            results: news.map(item => ({
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

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const byUser = async (req, res) => {

    try {

        const id = req.userId

        const news = await byUserService(id)

        return res.send({
            results: news.map(item => ({
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

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const update = async (req, res) => {

    try {
        
        const {title, text, banner} = req.body
        const {id} = req.params //id do post(news)

        if (!title && !banner && !text) {
            return res.status(400).send({ message: "Submit at last one field to update the post" })
        }

        const news = await findByIdService(id)

        if(news.user._id != req.userId){
            return res.status(400).send({ message: "You didn't update this post" })
        } 

        await updateService(id, title, text, banner)

        return res.send({message: "Post successfully updated"})

    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

const erase = async (req, res) => {
try {
    const {id} = req.params

    const news = await findByIdService(id)

    if(news.user._id != req.userId){
        return res.status(400).send({ message: "You didn't delete this post" })
    } 

    await eraseService(id)

    return res.send({message: "Post successfully deleted"})

} catch (err) {
    res.status(500).send({ message: err.message })
}
}


export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase }