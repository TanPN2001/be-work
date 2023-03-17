const express = require('express')
const { isAuthenticated } = require('../../middleware/auth')
const uploadFile = require('../../middleware/upload')
const CommonRouter = express.Router()
const CommonController = require('./Common.Controller')

CommonRouter.post('/register', CommonController.register)
CommonRouter.post('/login', CommonController.login)

CommonRouter.get('/profile', CommonController.getProfile)

CommonRouter.post('/image',isAuthenticated, uploadFile.single('photos') ,CommonController.postImage)


module.exports = CommonRouter