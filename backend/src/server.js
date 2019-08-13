const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

//Cria a instância do express
const serverHTTP = express()

//Extrai o modulo de HTTP do node e une ao servidor WebSocket 
const serverWebSocket = require('http').Server(serverHTTP)
const io = require('socket.io')(serverWebSocket)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query

    connectedUsers[user] = socket.id
})

mongoose.connect('mongodb+srv://tinder-user:tinderuser@cluster0-5hdjy.mongodb.net/tinder-dev?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

/*
 * Middleware utilizado para interceptar as requisições,
 * salvar instância do socket e os usuários conectados
 * e repassar para os controllers
 */
serverHTTP.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers

    //Segue o fluxo das rotas
    return next()
})

serverHTTP.use(cors())
//Habilita o uso de json no express
serverHTTP.use(express.json())
serverHTTP.use(routes)

//Servidor é habilitado para atender as requisições HTTP e WebSocket, "escutando" a partir da porta 3003
serverWebSocket.listen(3003)