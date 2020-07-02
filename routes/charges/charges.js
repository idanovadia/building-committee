const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const chargesController = require('../../controllers/chargesController/chargesController')

Router.get('/myCharges',checkAuth,chargesController.getUserCharges);
Router.get('/myGroupCharges',checkAuth,chargesController.getGroupCharges);
Router.get('/myAllGroupCharges',checkAuth,chargesController.getGroupChargesInDetails);
Router.post('/newCharges',checkAuth,chargesController.setNewCharge);
Router.post('/pay',checkAuth,chargesController.pay);


module.exports = Router;