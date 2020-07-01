const User = require('../../models/user');
const bcrypt = require('bcrypt');
const userDB = require('../../mySql/usersDB');
const Validator = require("../../mySql/Validator");
const { use } = require('../../routes/userRoutes/registration');
const userModel = require('../../models/user');

/**checked */

async function insertManager(tmpBody,hash){
    groupNumber = await userDB.getLastGroupNumber() + 1;
    const user = new userModel.user(
        tmpBody.username,
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
    return await userDB.updateManager(user.username,tmpBody.numberOfTenants,user.groupNumber);
}

async function insertParticipant(tmpBody,hash){
    groupNumber = await userDB.getParticipantGroupNumber(tmpBody.code);
    const user = new userModel.user(
        tmpBody.username,
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
}

exports.register = async(req,res,next)=>{
    try{
        tmpBody = req.body;
        await Validator.registrationValidator(tmpBody);
        bcrypt.hash(tmpBody.password,10,async(err,hash)=>{
            var ans = "";
            if(tmpBody.role === 'manager'){
                ans = await insertManager(tmpBody,hash);
            }else if(tmpBody.role === 'participant'){
                ans = await insertParticipant(tmpBody,hash);
            }
            res.status(200).send(ans);
        });
    }catch(err){
        return res.status(500).json({
            error: err.message    
        });
    }
};