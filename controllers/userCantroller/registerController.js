const User = require('../../models/user');
const bcrypt = require('bcrypt');
const userDB = require('../../mySql/usersDB');
const Validator = require("../../mySql/Validator");
const { use } = require('../../routes/userRoutes/registration');
const userModel = require('../../models/user');

/**checked */

async function insertManager(tmpBody,hash){
    try{
        groupNumber = await userDB.getLastGroupNumber() + 1;
        const user = new userModel.user(
            tmpBody.userName,
            hash,
            tmpBody.firstName,
            tmpBody.lastName,
            tmpBody.city,
            tmpBody.street,
            tmpBody.buildingNumber,
            tmpBody.apartmentNumber,
            tmpBody.phone,
            tmpBody.role,
            groupNumber
        );
        await userDB.insertUser(user);
        return await userDB.updateManager(user.username,0,user.groupNumber);
    }catch(err){
        throw new Error(err);
    }
   
}

async function insertParticipant(tmpBody,hash){
    try{
        await Validator.validInputVar(tmpBody.code);
        groupNumber = await userDB.getParticipantGroupNumber(tmpBody.code);
        const user = new userModel.user(
            tmpBody.userName,
            hash,
            tmpBody.firstName,
            tmpBody.lastName,
            tmpBody.city,
            tmpBody.street,
            tmpBody.buildingNumber,
            tmpBody.apartmentNumber,
            tmpBody.phone,
            tmpBody.role,
            groupNumber
        );
        return await userDB.insertUser(user);
    }catch(err){
        throw new Error(err);
    }
    
}

exports.register = async(req,res,next)=>{
    try{
        tmpBody = req.body;
        await Validator.registrationValidator(tmpBody);
        bcrypt.hash(tmpBody.password,10,async(err,hash)=>{
            try{
                var ans = "";
                if(tmpBody.role === 'manager'){
                    ans = await insertManager(tmpBody,hash);
                }else if(tmpBody.role === 'participant'){
                    ans = await insertParticipant(tmpBody,hash);
                }
                else{
                    throw new Error("Not a legal user role");
                }
                res.status(200).send(ans);
            }catch(err){
                return res.status(500).json({
                    error: err.message    
                });
            }
        });
    }catch(err){
        return res.status(500).json({
            error: err.message    
        });
    }
};