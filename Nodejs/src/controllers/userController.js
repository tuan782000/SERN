import userService from "../services/userService";

let handleLogin =async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1, // err 1 báo lỗi 0 báo thành công
            message: 'Missing inputs parameter !!!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    //check email tồn tại hay ko check email exist
    //so sánh password mà người dùng truyền lên cho chúng ta compare password
    //return userInfor
    //access token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode, // err 1 báo lỗi 0 báo thành công
        message: userData.errMessage,
        user: userData.user ? userData.user: {} //check điều kiện mà nếu trả thông tin người dùng mà nếu ko trả thông tin người dùng thì nó {trả ra rỗng}
    })
}

module.exports = {
    handleLogin: handleLogin
}