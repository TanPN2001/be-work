const express = require('express')
const CommonRouter = express.Router()

const CommonController = require('./Common.Controller')

CommonRouter.post('/register', CommonController.register)
CommonRouter.post('/login', CommonController.login)

module.exports = CommonRouter