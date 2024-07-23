const adminModel = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function adminLoginController(req, res) {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            throw new Error("Please Provide Email and Password")
        }
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            throw new Error("admin doesn't Exists");
        }
        const checkPassword = await bcrypt.compare(password, admin.password)
        
        if (checkPassword) {
            const tokenData = {
                _id: admin._id, 
                email: admin.email,
                role: admin.role
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '30d'} )

            // const tokenOptions = {
            //     httpOnly: true,
            //     secure: true
            // }
            res.cookie("token", token).json({
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
module.exports = adminLoginController;