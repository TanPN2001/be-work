const express = require('express')
const { isAuthenticated } = require('../../middleware/auth')
const uploadFile = require('../../middleware/upload')
const CommonRouter = express.Router()
const CommonController = require('./Common.Controller')

CommonRouter.post('/register', CommonController.register)
CommonRouter.post('/login', CommonController.login)
CommonRouter.get('/profile', CommonController.getProfile)
CommonRouter.get('/num-user', CommonController.getNumUser)
CommonRouter.get('/num-company', CommonController.getNumCompany)
CommonRouter.get('/num-work', CommonController.getNumWork)

CommonRouter.post('/image',isAuthenticated, uploadFile.single('photos') ,CommonController.postImage)


module.exports = CommonRouter