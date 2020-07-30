const mysqlConnection = require("../connection");
const { query } = require("express");

module.exports = {

    insertParticipants : async(appointmentID,participants,managerUsername) => {
        var newQuery = 'INSERT INTO meeting_participants (userName, appointmentID) VALUES';
        participants.forEach(participant => newQuery = newQuery + '('+"'"+participant+"'"+','+"'"+appointmentID+"'"+'),');
        // newQuery = newQuery + '('+"'"+managerUsername+"'"+','+"'"+appointmentID+"'"+')';
        // newQuery = newQuery.replaceAt(newQuery.length-1," ");
        newQuery = newQuery.replaceAt(newQuery.length-1," ");
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query(newQuery,(err,rows,fields)=>{
                if(!err){
                    resolve("The meeting has been set");
                }
                else{
                    reject("Failed");
                }
            });
        });
        return ans;
    },

    updateStatus: async(appointmentID,userName,status) => {
        return await new Promise((resolve,reject)=>{
            mysqlConnection.query(`${`${`UPDATE meeting_participants Set status = '${status}' WHERE userName = `}'${userName}' AND appointmentID = `}'${appointmentID}'` ,(err,rows,fields)=>{
                if(!err){
                    resolve('Status has been updated');
                }
                else{
                    reject(err);
                }
            });
        });
    },

    getStatus: async(appointmentID,userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query(`SELECT status FROM meeting_participants WHERE appointmentID='${appointmentID}'And userName = '${userName}'` ,(err,rows,fields)=>{
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

    getGroupStatus: async(appointmentID) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query(`SELECT COUNT(userName),status FROM meeting_participants WHERE appointmentID='${appointmentID}' group by status` ,(err,rows,fields)=>{
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
}