const mysqlConnection = require("../connection");

module.exports = {

    getUserPayments: (username) => {
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

    getGroupPayments: (userName) => {
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
    getGroupPaymentsInDetails: (userName) => {
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
            mysqlConnection.query('INSERT INTO payments (userName, amount, payDate, chargeDate, objective'+
                ' VALUES ('+"'"+payment.userName+"'"+','+"'"+payment.amount+"'"+','+"'"+payment.payDate+"'"+','+"'"+payment.chargeDate+"'"+','
                +"'"+payment.objective+"'"+')',(err,rows,fields)=>{
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