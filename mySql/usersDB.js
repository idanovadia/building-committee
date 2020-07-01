const mysqlConnection = require("../connection");
const crypto = require('crypto');

function genHash(s){
    hash = crypto.getHashes();
    hashPwd = crypto.createHash('sha1').update(`${s}thereissometime`).digest('hex'); 
    return hashPwd;
}

module.exports = {
    
    /** User update his password */
    updateUserPassword: async(userName,password) =>{
        return await new Promise((resolve,reject)=>{
            mysqlConnection.query(`${`UPDATE users Set password = '${password}' WHERE userName = `}'${userName}'` ,(err,rows,fields)=>{
                if(!err){
                    resolve('Password has been updated');
                }
                else{
                    reject(err);
                }
            });
        });
    },

    /** User update his details */
    updateDetails: (details)=>{
        console.log("ss");
    },

    /** return user record by username */
    getUser: async (userName) =>{
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT * FROM users WHERE userName='+"'"+userName+"'",(err,rows,fields)=>{
                if(!err){
                    resolve(rows);
                }
                else{
                    reject("Auth failed");
                }
            });
        });
        return ans; 
    },

    /** insert new user */
    insertUser: async (user) => {
        return await new Promise((resolve,reject)=>{
            mysqlConnection.query('INSERT INTO users (userName, password, firstName, lastName,'
                +' city, street, buildingNumber, apartmentNumber, phone, role, groupNumber)'+
                ' VALUES ('+"'"+user.username+"'"+','+"'"+user.password+"'"+','+"'"+user.firstName+"'"+','+"'"+user.lastName+"'"+','
                +"'"+user.city+"'"+','+"'"+user.street+"'"+','+"'"+user.buildingNumber+"'"+','+"'"+user.apartmentNumber+"'"+','+"'"+user.phone+"'"+','+"'"+user.role+"'"+','
                +"'"+user.groupNumber+"'"+')',(err,rows,fields)=>{
                if(!err){
                    resolve('insertion succeed');
                }
                else{
                    reject(err);
                }
            });
        });
    },

    /**Insert new record to manegersproperties table - after insert manager to users table  */
    updateManager: async (username,numberOfTenants,groupNumber) =>{
        return await new Promise((resolve,reject)=>{
            mysqlConnection.query('INSERT INTO manegersproperties (groupNumber, numberOfTenants, userName, groupCode)'
            +' VALUES ('+"'"+groupNumber+"'"+','+"'"+numberOfTenants+"'"+','+"'"+username+"'"+','+"'"+genHash(groupNumber)+"'"+')',(err,rows,fields)=>{
                if(!err){
                    resolve('insertion succeed');
                }
                else{
                    reject(err);
                }
            });
        });
    },
    
    /** Get the last group number in DB for insert new one with next number*/
    getLastGroupNumber: async () => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT MAX(groupNumber) as max FROM manegersproperties',(err,rows,fields)=>{
                if(!err){
                    var max = rows[0].max;
                    if( max === null)
                        resolve(0);
                    else
                        resolve(max);
                }
                else{
                    console.log(err);
                }
            });
        });
        return ans; 
    },
    /** get Participant Group Number to insert him to the correct group, the group number is correlate to group code  */
    getParticipantGroupNumber: async (code) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT groupNumber FROM manegersproperties WHERE groupCode='+"'"+code+"'",(err,rows,fields)=>{
                if(!err){
                    resolve(rows[0].groupNumber);
                }
                else{
                    console.log(err);
                }
            });
        });
        return ans; 
    },

    
}