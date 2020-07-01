const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const chargesController = require('../../controllers/chargesController/chargesController')

Router.get('/userCharges',checkAuth,chargesController.getUserCharges);


module.exports = Router;