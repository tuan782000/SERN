import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exits
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email }, //email thứ 2 là email chúng ta truyền vào || biến sau gán giá trị cho biến trước
                    raw: true
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;//làm xóa trên server ko sợ bị hack xóa này để ko log ra password
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Please try other email!`
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email : userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}