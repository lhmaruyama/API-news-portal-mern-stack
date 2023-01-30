import News from "../models/News.js"

const createService = (body) => News.create(body)

const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user")
//.sort({_id: -1}) traz as news de traz pra frente, pegando pelo id
//.skip(offset) de quanto em quantos pego as news, como um indice
//.limit(limit) quantidade de news por vez
//.populate("user") traz os valores de user

const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user")

const findByIdService = (id) => News.findById(id).populate("user")

//o $regex é comando próprio do mongodb para consultas
//o $options: "i" informa que não quero case sensitive
const searchByTitleService = (title) => News.find({
    title: { $regex: `${title || ""}`, $options: "i" }
}).sort({ _id: -1 }).populate("user")

const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate("user")

const updateService = (id, title, text, banner) => News.findOneAndUpdate({ _id: id }, { title, text, banner }, { rawResult: true })

const eraseService = (id) => News.findByIdAndDelete({ _id: id })

const likeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews, "likes.userId": { $nin: [userId] } }, { $push: { likes: { userId, created: new Date() } } })
// o primeiro argumento do findOneAndUpdate é o critério
// o segundo argumento do findOneAndUpdate é o a função
// _id: idNews: busca pelo id da news,
//"likes.userId": { $nin: [userId] } : filtro que busca o id do user [userId] dentro do array likes, e se não está ($nin, função do mongodb) aí faz o update com a função $push
//$push é a função do mongo para inserir um valor no array likes, e tbm crio uma data em seguida

const deletelikeNewsService = (idNews, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } })

const addCommentService = (idNews, comment, userId) => {

    const idComment = Math.floor(Date.now() * Math.random()).toString(36)

    return News.findOneAndUpdate(
        { _id: idNews }, { $push: { comments: { idComment, userId, comment, createAt: new Date() } } })
}

const deleteCommentService = (idNews, idComment, userId) => News.findOneAndUpdate({ _id: idNews }, { $pull: { comments: {idComment, userId } } })


export { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, eraseService, likeNewsService, deletelikeNewsService, addCommentService, deleteCommentService }