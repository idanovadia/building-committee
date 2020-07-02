const paymentDB = require("../mySql/paymentDB");

module.exports = {
    payment : class Payment {

        constructor(paymentID,userName, amount,payDate, chargeDate, objective){
            this.paymentID = paymentID;
            this.userName = userName;
            this.amount = amount;
            this.payDate = payDate;
            this.chargeDate = chargeDate;
            this.objective = objective;
        }
    },
} 
