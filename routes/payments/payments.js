const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const paymentsController = require('../../controllers/paymentsController/paymentsController')

Router.get('/userPayments',checkAuth.authorization,paymentsController.getUserPayments);
Router.get('/groupPayments',checkAuth.authorization,paymentsController.getGroupPayments);
/**Only manager */
Router.get('/groupPaymentsInDetails',checkAuth.authorization,checkAuth.managerAuthorization,paymentsController.getGroupPaymentsInDetails);

module.exports = Router;