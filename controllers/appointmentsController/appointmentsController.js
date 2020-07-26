const appointmentsDB = require('../../mySql/appointmentsDB');
const participantsDB = require('../../mySql/meeting_participantsDB');
const usersDB = require('../../mySql/usersDB');
const Validator = require('../../mySql/Validator');
const meeting = require('../../models/meeting')

module.exports = {

    getGroupMembers : async(req,res,next)=>{
        try{
            var users = await usersDB.getGroupParticipants(req.userData.userName);
            return res.status(200).json({
                message: "Successfully worked",
                users: users
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    getAppointmentDetails: async(req,res,next)=>{
        try{
            appointmentID = req.query.appointmentID;
            // appointmentID = req.body.appointmentID;
            var appointments = await appointmentsDB.getAppointmentDetails(appointmentID);
            return res.status(200).json({
                message: "Successfully worked",
                appointments: appointments
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

    insertMeeting:  async(req,res,next)=>{
        try{
            var meetingObj = new meeting.meeting(req.userData.userName,req.body.date,req.body.objective);
            var appointmentID = await appointmentsDB.insertMeeting(meetingObj);
            var appointments = await participantsDB.insertParticipants(appointmentID,req.body.participants,req.userData.userName);
            return res.status(200).json({
                message: "Successfully worked",
                appointments: appointments
            });
        }catch(err){
            return res.status(500).json({
                message: "Failed"
            });
        }
    },

}