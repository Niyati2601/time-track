const userModal = require("../models/User")

const GetUserById = async (req, res) => {
    try {
        const user = await userModal.findById(req.params.id);
        console.log("req.params.Id:",req.params.id)
        console.log("userId:",req.userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: user,
            message: "User details"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = GetUserById;