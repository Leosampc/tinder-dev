const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://tinder-user:tinderuser@cluster0-5hdjy.mongodb.net/tinder-dev?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(express.json())
server.use(routes)

server.listen(3003)