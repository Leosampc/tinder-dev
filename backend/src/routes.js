const express = require('express')

//Import das controllers
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

//Module Router do express
const routes = express.Router()

//Rota para listar os devs
routes.get('/devs', DevController.index)
//Rota de cadastro de novos devs
routes.post('/devs', DevController.store)

//Rotas de Like/Dislike
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

module.exports = routes