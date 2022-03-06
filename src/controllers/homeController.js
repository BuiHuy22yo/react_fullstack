import  db from '../models/index'
import  CRUDServer from "../services/CRUDServer"
let getHomePage = async (req,res) => {
    try {
        let data = await db.User.findAll();

        return res.send(JSON.stringify(data));
    } catch (e){
        console.log(e)
    }

}
let getAboutPage = (req,res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req,res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req,res) => {
    let message = await CRUDServer.createNewUser(req.body);
    console.log(message)
    return res.send('post crud form server')
}
let getReadCRUD = async (req,res) => {
    let data = await CRUDServer.getAllUser();
    return res.render('listUser.ejs',{
        data : data
    });
}
let getEditCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){
        let data = await CRUDServer.getEditUser(userId);
        if(data){
            return res.render('editUser.ejs',{
                data : data
            });
        }
    }
    else {
        return res.send('user not found')
    }
}

let putCRUD = async (req,res) => {
    let data = await CRUDServer.updateUserData(req.body);
    return res.render('listUser.ejs',{
        data : data
    });
}
let getDeleteCRUD = async (req,res) => {
    let userId = req.query.id;
    if(userId){
        let data = await CRUDServer.getDeleteUser(userId);
        if(data){
            return res.render('listUser.ejs',{
                data : data
            });
        }
    }
    else {
        return res.send('user not found')
    }
}

module.exports = {
    getHomePage : getHomePage,
    getAboutPage : getAboutPage,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    getReadCRUD : getReadCRUD,
    getEditCRUD : getEditCRUD,
    putCRUD : putCRUD,
    getDeleteCRUD : getDeleteCRUD

}