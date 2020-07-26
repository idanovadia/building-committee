// const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDB = require('../../mySql/usersDB');
// const validator = require('../../mySql/Validator');
const Validator = require('../../mySql/Validator');
JWT_KEY = "dkfmsdlmlsmflsmflmslmflsmflmslfmsdlmfldsmf"

/**checked */

exports.login = async(req,res,next)=>{
    try{
        var user = await userDB.getUser(req.body.userName);
        Validator.loginValidator(user);
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    error: 'Auth failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    userName:user[0].userName,
                    role:user[0].role,
                }, JWT_KEY,{
                    expiresIn: "10h"
                });
                return res.status(200).json({
                    message:'Login successful',
                    token:token
                });
            }
            return res.status(401).json({
                error: 'Auth failed'
            });
        });
    }catch(err){
        return res.status(401).json({
            error: err
        });
    }
    
};