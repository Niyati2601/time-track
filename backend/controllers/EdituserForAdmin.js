const userModal = require("../models/User");
const bcrypt = require("bcryptjs");


const EditUser = async (req, res) => {
  try {
    const user = await userModal.findById(req.params.id);
    if (user) {

      const updatedData = {
        username: req.body.username,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
        role: req.body.role,
        isMentor: req.body.isMentor
      };

      const updatedUser = await userModal.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        success: true,
        error: false,
        message: "Profile Updated",
        user: updatedUser, 
      });
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

module.exports = EditUser;
