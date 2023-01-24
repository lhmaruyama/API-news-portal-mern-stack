const create = (req, res) => {
    const user = req.body
    console.log(user)
}

module.exports = {create}




/* const soma = (req, res) => {
    const soma = 1 + 1
    res.send({soma: soma})
}

module.exports = {soma} */