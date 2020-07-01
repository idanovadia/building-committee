const mysqlConnection = require("../connection");
const paymentDB = require("../mySql/paymentDB");
const payment = require("../models/payment");
const { query } = require("express");

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function getCharge(code){
    var ans = await new Promise((resolve,reject)=>{
        mysqlConnection.query('SELECT * FROM charges WHERE chargeID='+"'"+chargeID+"'",(err,rows,fields)=>{
            if(!err){
                var payObj = new payment.payment(rows[0].userName,rows[0].amount,new Date(),rows[0].chargeDate,rows[0].objective);
                resolve(payObj);
            }
            else{
                reject("Failed");
            }
        });
    });
    return ans; 
}

function delCharge(code){
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

    getUserCharges: (userName) => {
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

    getGroupCharges: (userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('select * from charges GROUP BY objective where userName in' +
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
    getGroupChargesInDetails: (userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('select * from charges where userName in' +
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

    setNewCharge: (listOfCharge) => {
        var newQuery = 'INSERT INTO charges (userName, amount, chargeDate, objective) VALUES';
        for (const charge in listOfCharge) {
            newQuery = newQuery + '('+"'"+charge.userName+"'"+','+"'"+charge.amount+"'"+','+"'"+
            charge.chargeDate+"'"+','+"'"+charge.objective+"'"+'),';
        }
        newQuery = newQuery.replaceAt(newQuery.length-1,";");

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

    pay: (chargeID) => {
        var raw = getCharge(chargeID);
        paymentDB.insertPayment(raw);
    },


}