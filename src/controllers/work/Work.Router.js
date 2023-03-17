const express = require('express')

const WorkRouter = express.Router()
const WorkController = require('./Work.Controller')
WorkRouter.post('/', WorkController.CreateWork)

module.exports = WorkRouter

