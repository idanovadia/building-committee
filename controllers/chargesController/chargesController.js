const chargeDB = require('../../mySql/chargesDB');
const Validator = require('../../mySql/Validator');

module.exports = {

    getUserCharges: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfCharges = await chargeDB.getUserCharges(username);
            return res.status(200).json({
                massage: "Successfully worked",
                listOfCharges: listOfCharges
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    getGroupCharges: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfGroupCharges = await chargeDB.getGroupCharges(username);
            return res.status(200).json({
                massage: "Successfully worked",
                listOfGroupCharges: listOfGroupCharges
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    getGroupChargesInDetails: async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var listOfGroupCharges = await chargeDB.getGroupChargesInDetails(username);
            return res.status(200).json({
                massage: "Successfully worked",
                listOfGroupCharges: listOfGroupCharges
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    setNewCharge: async(req,res,next)=>{
        try{
            await chargeDB.setNewCharge(req.body.listOfCharges);
            return res.status(200).json({
                massage: "Successfully inserted",
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    pay:async(req,res,next)=>{
        try{
            await chargeDB.pay(req.body.chargeID);
            return res.status(200).json({
                massage: "Successfully worked",
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

}