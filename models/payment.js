
module.exports = {
    payment : class Payment {

        constructor(userName, amount,payDate, chargeDate, objective){
                this.userName = userName;
                this.amount = amount;
                this.payDate = payDate;
                this.chargeDate = chargeDate;
                this.objective = objective;
        }
    },
} 
