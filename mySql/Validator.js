const userDB = require('../mySql/usersDB');


module.exports = {
    registrationValidator : async(tmpBody) => {
        var userExist = await userDB.getUser(tmpBody.username)
        if(userExist.length>0){
            throw Error("user already exist");
        }
        // if(!Number.isInteger(tmpBody.buildingNumber) || !Number.isInteger(tmpBody.apartmentNumber)){
        //     throw Error("buildingNumber or apartmentNumber is not a number");
        // }
    },
    loginValidator : (user) => {
        if(user.length<1){
            throw Error("Auth failed");
        }
    }
}