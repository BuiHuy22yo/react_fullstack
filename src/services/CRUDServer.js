
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

let getAllUser =  () =>{
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            if (users){
                resolve(users);
            }
            else
            {
                resolve({});
            }


        }
        catch (e){
            reject(e);
        }
    })

}
let getEditUser =  (userId) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id :userId}
            });
            resolve(user);
        }
        catch (e){
            reject(e);
        }
    })

}
let updateUserData =  (data) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id :data.id}
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else {
                resolve();
            }


        }
        catch (e){
            reject(e);
        }
    })

}
let getDeleteUser =  (userId) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id :userId}
            });
            if(user){
                await user.destroy();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else {
                resolve();
            }


        }
        catch (e){
            reject(e);
        }
    })

}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getEditUser : getEditUser,
    updateUserData : updateUserData,
    getDeleteUser : getDeleteUser
};