const userModel = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "all users fetched successfully",
      data: users,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = getAllUsers;
