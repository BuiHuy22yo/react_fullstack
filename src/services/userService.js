const db = require("../models/index");
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes : ['email', 'roleId', 'password'],
                    raw : true,
                });
                if (user) {
                    //compare password
                   let check =  bcrypt.compareSync(password , user.password);
                   if(check){
                       userData.errCode = 0;
                       userData.message = `Ok`;
                       delete user.password;
                       userData.user = user;
                   }else {
                       userData.errCode = 3;
                       userData.message = `Wrong password`;
                   }

                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found`;

                }
                resolve(userData);
            } else {
                //return error
                userData.errCode = 1;
                userData.message = `Your's Email isn't exist in your system . plz try other email`;
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: email}
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
}
