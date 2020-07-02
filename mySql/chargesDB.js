const mysqlConnection = require("../connection");
const paymentDB = require("../mySql/paymentDB");
const payment = require("../models/payment");
const { query } = require("express");

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

async function getCharge(chargeID){
    var ans = await new Promise((resolve,reject)=>{
        mysqlConnection.query('SELECT * FROM charges WHERE chargeID='+"'"+chargeID+"'",(err,rows,fields)=>{
            if(!err){
                var payObj = new payment.payment(rows[0].chargeID,rows[0].userName,rows[0].amount,new Date(),rows[0].chargeDate,rows[0].objective);
                resolve(payObj);
            }
            else{
                reject("Failed");
            }
        });
    });
    return ans; 
}

async function delCharge(chargeID){
    var ans = await new Promise((resolve,reject)=>{
        mysqlConnection.query('DELETE FROM charges WHERE chargeID='+"'"+chargeID+"'",(err,rows,fields)=>{
            if(!err){
                resolve(rows[0]);
            }
            else{
                reject("Failed");
            }
        });
    });
    return ans; 
}

module.exports = {

    getUserCharges: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT * FROM charges WHERE userName='+"'"+userName+"'",(err,rows,fields)=>{
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

    getGroupCharges: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            var query = 'select sum(amount) as debt, objective from charges where userName in' +
            '(select userName from users where groupNumber in' + 
            '(select groupNumber from users where userName = '+"'"+userName+"'"+')) GROUP BY objective';
            mysqlConnection.query(query,(err,rows,fields)=>{
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
    getGroupChargesInDetails: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('select * from charges where userName in' +
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

    /**work  */
    setNewCharge: async(listOfCharges) => {
        var newQuery = 'INSERT INTO charges (userName, amount, chargeDate, objective) VALUES';
        listOfCharges.forEach(charge => newQuery = newQuery + '('+"'"+charge.userName+"'"+','+"'"+charge.amount+"'"+','+"'"+
            charge.chargeDate+"'"+','+"'"+charge.objective+"'"+'),');
        newQuery = newQuery.replaceAt(newQuery.length-1," ");

        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query(newQuery,(err,rows,fields)=>{
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

    pay: async(chargeID) => {
        var raw = await getCharge(chargeID);
        var del = await delCharge(chargeID);
        await paymentDB.insertPayment(raw);
    },


}