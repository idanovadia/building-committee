const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const chargesController = require('../../controllers/chargesController/chargesController')

Router.get('/myCharges',checkAuth.authorization,chargesController.getUserCharges);
Router.get('/myGroupCharges',checkAuth.authorization,chargesController.getGroupCharges);
Router.get('/myAllGroupCharges',checkAuth.authorization,checkAuth.managerAuthorization,chargesController.getGroupChargesInDetails);
Router.post('/newCharges',checkAuth.authorization,checkAuth.managerAuthorization,chargesController.setNewCharge);
Router.post('/pay',checkAuth.authorization,checkAuth.managerAuthorization,chargesController.pay);


module.exports = Router;