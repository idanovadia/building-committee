const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");
const updateDetailsController = require('../../controllers/userCantroller/updateDetailsController')


Router.post("/updatePassword",checkAuth.authorization,updateDetailsController.updatePassword);

// Router.post("/personal",checkAuth,(req,res,next)=>{
    
// });

module.exports = Router;