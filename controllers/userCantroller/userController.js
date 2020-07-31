const userDB = require('../../mySql/usersDB');
const userUpdateDetails = require('../../models/user');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const usersDB = require('../../mySql/usersDB');

exports.getUser = async(req,res,next)=>{
    
    try{
        username = req.userData.userName;
        var myUser = (await userDB.getUser(username))[0];
        if(myUser.role === 'manager'){
            myUser.code = (await usersDB.getCode(username))[0].groupCode;
        }
        delete myUser['password'];
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
