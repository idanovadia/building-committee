
module.exports = {
    user : class User {

        constructor(username,password,firstName,lastName,
            city,street,buildingNumber,apartmentNumber,phone,role,groupNumber){
                this.username = username;
                this.password = password;
                this.firstName = firstName;
                this.lastName = lastName;
                this.city = city;
                this.street = street;
                this.buildingNumber = buildingNumber;
                this.apartmentNumber = apartmentNumber;
                this.phone = phone;
                this.role = role;
                this.groupNumber = groupNumber;
        }
    },
    updateUser : class updateUser {

        constructor(firstName,lastName,
            city,street,buildingNumber,apartmentNumber,phone){
                this.firstName = firstName;
                this.lastName = lastName;
                this.city = city;
                this.street = street;
                this.buildingNumber = buildingNumber;
                this.apartmentNumber = apartmentNumber;
                this.phone = phone;
                this.role = role;
        }
    },
} 

// module.exports = User;