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

export { createService, findAllService, countNews, topNewsService, findByIdService }