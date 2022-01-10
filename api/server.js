// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model.js')

const server = express()

server.use(express.json())

//ENDPOINTS

//GET
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
