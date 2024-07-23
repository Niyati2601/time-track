const userModal = require("../models/User");
const adminModal = require("../models/Admin");

const GetUserDetails = async (req, res) => {
    try { 
        const user = await userModal.findById( req.userId )
        // console.log('req.userId: ', req.userId);
        // console.log(req.userRole)
        res.status(200).json({
            success: true,
            error: false,
            data: user,
            message: "User Details"
        })
    } catch (error) {
        res.json({
            message: error.message || error,
             error: true,
            success: false,
        })
    }
}
const GetAdminDetails = async (req, res) => {
    try {
        const user = await adminModal.findById(req.userId)
        console.log('req.userId: ', req.userId);
        console.log("reqhuyiu:", req)
        res.status(200).json({
            success: true,
            error: false,
            data: user,
            message: "Admin Details"
        })
    } catch (error) {
        res.json({
            message: error.message || error,
             error: true,
            success: false,
        })
    }
}

module.exports = {GetUserDetails, GetAdminDetails};