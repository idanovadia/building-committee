const userDB = require("../mySql/usersDB");
var passwordValidator = require('password-validator');


function validationPassword(password){
    var schema = new passwordValidator();
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                   // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces();
    if(!schema.validate(password)){
        throw Error('The password is not valid, please try again');
    };                       // Should not have spaces // Blacklist these values
}

async function userExist(tmpBody){
    var userExist = await userDB.getUser(tmpBody.userName);
    if(userExist.length>0){
        throw Error("user already exist");
    }

}

module.exports = {

    registrationValidator : async(tmpBody) => {
        await userExist(tmpBody);
        await validationPassword(tmpBody.password);
        // if(!Number.isInteger(tmpBody.buildingNumber) || !Number.isInteger(tmpBody.apartmentNumber)){
        //     throw Error("buildingNumber or apartmentNumber is not a number");
        // }
    },
    validInputVar: async (variable) => {
        if(variable === undefined || variable === null){
            throw Error("There is incorrect information that has been inserted");
        }
    },

    loginValidator : (user) => {
        if(user.length<1){
            throw Error("Auth failed");
        }
    }
}