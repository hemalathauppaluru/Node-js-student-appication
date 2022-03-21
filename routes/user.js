const express = require('express')

const userRoutes = express.Router()

const  userControllers= require('../controllers/user')
userRoutes.post('/register', userControllers.register)
userRoutes.post('/login', userControllers.login)

module.exports = userRoutes;