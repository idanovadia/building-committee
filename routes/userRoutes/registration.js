const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../../connection");
const registerController = require('../../controllers/userCantroller/registerController')

Router.post("/",registerController.register);

module.exports = Router;