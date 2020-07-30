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

    getAppointments: async(userName) => {
        var ans = await new Promise((resolve,reject)=>{
            mysqlConnection.query(`select * from appointments where appointmentsID in (SELECT appointmentID FROM meeting_participants WHERE userName='${userName}')`,(err,rows,fields)=>{
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
            var query = 'INSERT INTO appointments (userName, start_date, end_date, objective )'+
            ' VALUES ('+"'"+meeting.userName+"'"+','+"'"+meeting.start_date+"'"+','+"'"+meeting.end_date+"'"+','+"'"+meeting.objective+"'"+')';
            mysqlConnection.query(query,(err,rows,fields)=>{
                if(!err){
                    resolve(rows.insertId);
                }
                else{
                    reject(err);
                }
            });
        });
    },

    updateMeeting : async(meeting) => {
        return await new Promise((resolve,reject)=>{
            var query = `Update appointments set start_date ='${meeting.start}', end_date ='${meeting.end}' where appointmentsID ='${meeting.id}'`;
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