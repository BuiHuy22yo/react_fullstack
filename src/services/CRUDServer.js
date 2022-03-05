
import  db from '../models/index'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async  (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPassWord = await hashUserPassWordForm(data.password);
            await db.User.create({
                email: data.email,
                password: hashUserPassWord,
                firstName: data.firstName,
                lastName: data.lastName,
                address : data.address,
                phoneNumber : data.phoneNumber,
                gender : data.gender === '1' ? true : false,
                roleId : data.roleId,

            })
            resolve('ok create a new user succeed!');
        } catch (e) {
            reject(e);
        }
    })

}
let hashUserPassWordForm = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord)
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
};