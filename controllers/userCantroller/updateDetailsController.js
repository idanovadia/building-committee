const userDB = require('../../mySql/usersDB');
const userUpdateDetails = require('../../models/user');
const user = require('../../models/user');
const bcrypt = require('bcrypt');

/**not checked yet*/


exports.updatePassword = async(req,res,next)=>{
    try{
        var myUser = await userDB.getUser(req.userData.userName);
        bcrypt.compare(req.body.oldPassword,myUser[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Update has been failed'
                });
            }
            if(result){
                return bcrypt.hash(req.body.newPassword,10,async(err,hash)=>{
                        await userDB.updateUserPassword(req.body.userName,hash);
                        return res.status(200).json({
                            message:'Update has been succeeded',
                        });
                });
            }
            return res.status(401).json({
                message: 'Update has been failed'
            });
        }); 
    }catch(err){
        return res.status(401).json({
            message: 'Update has been failed'
        });
    }
    
};

//firstName, lastName, city, street, buildingNumber,apartmentNumber, phone
exports.updateUser = async(req,res,next)=>{
    var newDetails = new user.updateUser(req.body.firstName,req.body.lastName,req.body.city,
        req.body.street,req.body.buildingNumber,req.body.apartmentNumber,req.body.phone);
    return userDB.updateDetails(newDetails);
}