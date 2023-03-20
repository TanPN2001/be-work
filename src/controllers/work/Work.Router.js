const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isCompany,
} = require("../../middleware/auth");
const uploadFile = require("../../middleware/upload");

const WorkRouter = express.Router();
const WorkController = require("./Work.Controller");

WorkRouter.get('/search', WorkController.searchWork)
WorkRouter.get('/:id',  WorkController.getWorkById)
WorkRouter.post("/", isCompany, uploadFile.single("photos"), WorkController.CreateWork);
WorkRouter.get('/',  WorkController.getWork)

module.exports = WorkRouter;
