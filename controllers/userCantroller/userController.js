const userDB = require('../../mySql/usersDB');
const userUpdateDetails = require('../../models/user');
const user = require('../../models/user');
const bcrypt = require('bcrypt');

exports.getUser = async(req,res,next)=>{
    
    try{
        username = req.userData.userName;
        var myUser = (await userDB.getUser(username))[0];
        delete myUser['password']
        return res.status(200).json({
            message: "Successfully worked",
            myUser: myUser
        });
    }catch(err){
        return res.status(500).json({
            message: "Failed"
        });
    }
}
