// const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDB = require('../../mySql/usersDB');
// const validator = require('../../mySql/Validator');
const Validator = require('../../mySql/Validator');
JWT_KEY = "dkfmsdlmlsmflsmflmslmflsmflmslfmsdlmfldsmf"

/**checked */

exports.login = async(req,res,next)=>{
    var user = await userDB.getUser(req.body.userName);
    try{
        Validator.loginValidator(user);
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    userName:user[0].userName,
                    role:user[0].role,
                }, JWT_KEY,{
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message:'Auth successful',
                    token:token
                });
            }
            return res.status(401).json({
                message: 'Auth failed'
            });
        });
    }catch(err){
        return res.status(401).json({
            message: err.message
        });
    }
    
};