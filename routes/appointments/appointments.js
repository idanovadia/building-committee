const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const appointmentsController = require('../../controllers/appointmentsController/appointmentsController')

Router.get('/getAppointmentDetails',checkAuth.authorization,appointmentsController.getAppointmentDetails);

Router.get('/GroupMembers',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.getGroupMembers);
Router.post('/insertMeeting',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.insertMeeting);


module.exports = Router;