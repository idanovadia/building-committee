const mysqlConnection = require("../connection");

module.exports = {

    getUserPayments: async(username) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT * FROM payments WHERE userName='+"'"+userName+"'",(err,rows,fields)=>{
                if(!err){
                    resolve(rows);
                }
                else{
                    reject("Failed");
                }
            });
        });
        return ans; 
    },

    getGroupPayments: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('select * from payments GROUP BY objective where userName in' +
             '(select userName from users where groupNumber in' + 
             '(select groupNumber from users where userName = '+"'"+userName+"'"+'))',(err,rows,fields)=>{
                if(!err){
                    resolve(rows);
                }
                else{
                    reject("Failed");
                }
            });
        });
        return ans; 
    },

    /** Only Manager */
    getGroupPaymentsInDetails: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('select * from payments where userName in' +
             '(select userName from users where groupNumber in' + 
             '(select groupNumber from users where userName = '+"'"+userName+"'"+' AND role = manager))',(err,rows,fields)=>{
                if(!err){
                    resolve(rows);
                }
                else{
                    reject("Failed");
                }
            });
        });
        return ans; 
    },

    insertPayment: async(payment) => {
        return await new Promise((resolve,reject)=>{
            var query = 'INSERT INTO payments (paymentID, userName, amount, payDate, chargeDate, objective )'+
            ' VALUES ('+"'"+payment.paymentID+"'"+','+"'"+payment.userName+"'"+','+"'"+payment.amount+"'"+','+"'"+payment.payDate+"'"+','+"'"+payment.chargeDate+"'"+','
            +"'"+payment.objective+"'"+')';
            mysqlConnection.query(query,(err,rows,fields)=>{
                if(!err){
                    resolve('payment succeed');
                }
                else{
                    reject(err);
                }
            });
        });
    }

}