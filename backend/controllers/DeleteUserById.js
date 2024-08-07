const userModal = require('../models/User');

const DeleteUserById = async (req, res) => {
    try {
        const user = await userModal.findByIdAndDelete(req.params.id);
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
            message: "User deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = DeleteUserById;