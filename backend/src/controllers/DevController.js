const axios = require('axios')
const DevModel = require('../models/DevModel')

module.exports = {
    async store(req, res) {
        const { username } = req.body

        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await DevModel.create({
            name,
            user: username,
            bio,
            avatar
        })
        
        return res.json(dev)
    }
}