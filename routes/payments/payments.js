const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const paymentsController = require('../../controllers/paymentsController/paymentsController')

Router.get('/userPayments',checkAuth,paymentsController.getUserPayments);
Router.get('/groupPayments',checkAuth,paymentsController.getGroupPayments);
/**Only manager */
Router.get('/groupPaymentsInDetails',checkAuth,paymentsController.getGroupPaymentsInDetails);

module.exports = Router;