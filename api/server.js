const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const usersRouter = require('./user/user-router.js')
const authRouter = require('./auth/auth-router.js')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) =>{
    res.status(200).json({ message: 'The api is lit... '})
})

module.exports = server