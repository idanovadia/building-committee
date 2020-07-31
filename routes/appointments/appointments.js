const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const appointmentsController = require('../../controllers/appointmentsController/appointmentsController')

Router.get('/getAppointmentDetails',checkAuth.authorization,appointmentsController.getAppointmentDetails);
Router.get('/getMyAppointments',checkAuth.authorization,appointmentsController.getMyAppointments);

Router.get('/GroupMembers',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.getGroupMembers);
Router.post('/insertMeeting',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.insertMeeting);
Router.post('/updateMeeting',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.updateMeeting);
Router.delete('/deleteMeeting',checkAuth.authorization,checkAuth.managerAuthorization,appointmentsController.deleteMeeting);


module.exports = Router;