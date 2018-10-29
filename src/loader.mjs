import bodyParser from 'body-parser'
import express from 'express'
import cors from './middlewares/cors.mjs'
import routes from './config/routes.mjs'

const port   = 3003
const server = express()

server.use(cors);
server.use(bodyParser.json());
server.listen(port, function() {
    console.log(`winnin-webservice is running on port ${port}`)
})

import './config/database.mjs'

routes(server)