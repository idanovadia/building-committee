const chargeDB = require('../../mySql/chargesDB');
const Validator = require('../../mySql/Validator');

module.exports = {

    getUserCharges: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfCharges = await chargeDB.getUserCharges(username);
            return res.status(200).json({
                message: "Successfully worked",
                listOfCharges: listOfCharges
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    getGroupCharges: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfGroupCharges = await chargeDB.getGroupCharges(username);
            return res.status(200).json({
                message: "Successfully worked",
                listOfGroupCharges: listOfGroupCharges
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    getGroupChargesInDetails: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfGroupCharges = await chargeDB.getGroupChargesInDetails(username);
            return res.status(200).json({
                message: "Successfully worked",
                listOfGroupCharges: listOfGroupCharges
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    setNewCharge: async(req,res,next)=>{
        try{
            await chargeDB.setNewCharge(req.body.listOfCharges);
            return res.status(200).json({
                message: "Successfully inserted",
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    pay:async(req,res,next)=>{
        try{
            await chargeDB.pay(req.body.chargeID);
            return res.status(200).json({
                message: "Successfully paid",
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

}