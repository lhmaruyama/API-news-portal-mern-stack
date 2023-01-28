import mongoose from "mongoose";


const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    banner: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(), //data atual do servidor local
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //User é nome da Schema de referencia usada no models User.js, para referenciar uma collection com a outra, no caso de usar um banco dados MongoDB que é not only
        required: true,
    },
    likes: {
        type: Array,
        require: true,
    },
    comments: {
        type: Array,
        require: true,
    },
})

const News = mongoose.model("News", NewsSchema)

export default News