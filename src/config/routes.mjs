import express from 'express'
import posts from '../controllers/posts.mjs'

export default (server) => {
    const router = express.Router()
    server.use('/', router)
    
    posts.register(router, '/posts')
}