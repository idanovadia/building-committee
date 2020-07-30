const paymentDB = require('../../mySql/paymentDB');
const Validator = require('../../mySql/Validator');

module.exports = {

    getUserPayments : async(req,res,next)=>{
        try{
            username = req.userData.userName;
            var payments = await paymentDB.getUserPayments(username);
            return res.status(200).json({
                message: "Successfully worked",
                payments: payments
            });
        }catch(err){
            return res.status(500).json({
                message: 'Failed'
            });
        }
    },

    getGroupPayments: async(req,res,next)=> {
        try{
            username = req.userData.userName;
            var payments = await paymentDB.getGroupPayments(username);
            return res.status(200).json({
                message: "Successfully worked",
                payments: payments
            });
        }catch(err){
            return res.status(500).json({
                message: 'Failed'
            });
        }
    },

    getGroupPaymentsInDetails: async(req,res,next)=> {
        try{
            username = req.userData.userName;
            var payments = await paymentDB.getGroupPaymentsInDetails(username);
            return res.status(200).json({
                message: "Successfully worked",
                payments: payments
            });
        }catch(err){
            return res.status(500).json({
                message: 'Failed'
            });
        }
    },
}