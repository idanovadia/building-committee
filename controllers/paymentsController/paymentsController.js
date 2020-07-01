const paymentDB = require('../../mySql/paymentDB');
const Validator = require('../../mySql/Validator');

module.exports = {

    getUserPayments : () => {
        try{
            username = req.userData.userName;
            var payments = paymentDB.getUserPayments(username);
            return res.status(200).json({
                payments: payments
            });
        }catch(err){
            return res.status(401).json({
                message: 'Failed'
            });
        }
    },

    getGroupPayments: () => {
        try{
            username = req.userData.userName;
            var payments = paymentDB.getGroupPayments(username);
            return res.status(200).json({
                payments: payments
            });
        }catch(err){
            return res.status(401).json({
                message: 'Failed'
            });
        }
    },

    getGroupPaymentsInDetails: () => {
        try{
            username = req.userData.userName;
            var payments = paymentDB.getGroupPaymentsInDetails(username);
            return res.status(200).json({
                payments: payments
            });
        }catch(err){
            return res.status(401).json({
                message: 'Failed'
            });
        }
    },
}