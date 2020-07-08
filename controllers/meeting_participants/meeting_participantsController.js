const participantsDB = require('../../mySql/meeting_participantsDB');
const Validator = require('../../mySql/Validator');

module.exports = {

    updateStatus : async(req,res,next)=>{
        try{
            var massage = await participantsDB.updateStatus(req.body.appointmentID,req.userData.userName,req.body.status);
            return res.status(200).json({
                massage: "Status Successfully changed",
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    getStatus:  async(req,res,next)=>{
        try{
            var status = await participantsDB.getStatus(req.query.appointmentID,req.userData.userName);
            return res.status(200).json({
                massage: "Successfully inserted",
                status: status
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

    getGroupStatus: async(req,res,next)=>{
        try{
            var statuses = await participantsDB.getGroupStatus(req.query.appointmentID);
            return res.status(200).json({
                massage: "Successfully inserted",
                statuses: statuses
            });
        }catch(err){
            return res.status(500).json({
                massage: "Failed"
            });
        }
    },

}