const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../../connection");
const checkAuth = require("../../middleware/auth");
const updateDetailsController = require('../../controllers/userCantroller/updateDetailsController')


Router.post("/updatePassword",checkAuth,updateDetailsController.updatePassword);

// Router.post("/personal",checkAuth,(req,res,next)=>{
    
// });

module.exports = Router;