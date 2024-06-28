const userModal = require("../models/User");
const bcrypt = require("bcryptjs");


const EditProfile = async (req, res) => {
  try {
    const user = await userModal.findById(req.userId);
    const salt = await bcrypt.genSaltSync(10);
    // const hashPassword = await bcrypt.hashSync(req.body.password, salt);
    if (user) {

      const updatedData = {
        username: req.body.username,
        // password: hashPassword,
        profilePhoto: req.body.profilePhoto,
      };

      const updatedUser = await userModal.findByIdAndUpdate(
        req.userId,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        success: true,
        error: false,
        message: "Profile Updated",
        user: updatedUser, // Include the updated user data in the response if needed
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

module.exports = EditProfile;
