const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");

const testController = require('../../controllers/testController/testController')

Router.get('/',testController.test);

module.exports = Router;