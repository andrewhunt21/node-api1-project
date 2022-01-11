// BUILD YOUR SERVER HERE

const express = require('express')
const User = require('./users/model.js')

const server = express()

server.use(express.json())

//ENDPOINTS

//POST
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        console.log(name, bio)
        const newUser = await User.insert({ name, bio })
        if (!newUser.name || !newUser.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            console.log(newUser)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

//GET
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

//DELETE
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.remove(req.params.id)
        if (!deletedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(deletedUser)
        }
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
