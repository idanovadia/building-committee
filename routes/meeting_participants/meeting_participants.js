const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const meeting_participantsController = require('../../controllers/meeting_participants/meeting_participantsController')

Router.get('/getStatus',checkAuth.authorization,meeting_participantsController.getStatus);
Router.get('/getGroupStatus',checkAuth.authorization,checkAuth.managerAuthorization,meeting_participantsController.getGroupStatus);
Router.post('/updateStatus',checkAuth.authorization,meeting_participantsController.updateStatus);


module.exports = Router;