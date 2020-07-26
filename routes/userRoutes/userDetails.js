const express = require("express");
const Router = express.Router();
const checkAuth = require("../../middleware/auth");
const userController = require('../../controllers/userCantroller/userController')


Router.get("/getUserDetails",checkAuth.authorization,userController.getUser);

// Router.post("/personal",checkAuth,(req,res,next)=>{
    
// });

module.exports = Router;