const mysqlConnection = require("../connection");
const { query } = require("express");


module.exports = {

    getAppointmentDetails: async(appointmentID) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query('SELECT * FROM appointments WHERE appointmentsID='+"'"+appointmentID+"'",(err,rows,fields)=>{
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

    insertMeeting : async(meeting) => {
        return await new Promise((resolve,reject)=>{
            var query = 'INSERT INTO appointments (userName, date, objective )'+
            ' VALUES ('+"'"+meeting.userName+"'"+','+"'"+meeting.date+"'"+','+"'"+meeting.objective+"'"+')';
            mysqlConnection.query(query,(err,rows,fields)=>{
                if(!err){
                    resolve(rows.insertId);
                }
                else{
                    reject(err);
                }
            });
        });
    }



}