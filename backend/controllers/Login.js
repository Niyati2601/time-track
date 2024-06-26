const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body
        console.log('email, password: ', email, password);
        if (!email || !password) {
            throw new Error("Please Provide Email and Password")
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User doesn't Exists");
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if (checkPassword) {
            const tokenData = {
                _id: user._id, 
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '30d'} )
            console.log('token: ', token);

            const tokenOptions = {
                httpOnly: true,
                secure: true
            }
            res.cookie("token", token, tokenOptions).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })
        }else {
            throw new Error("Please check Password");
        }


    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
module.exports = userLoginController;