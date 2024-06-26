const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false, error: true});
    } else {
      const userExist = await userModel.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "User already exist" , success: false, error: true});
      } else if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      } else {
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        const newUser = new userModel({
          username,
          email,
          password: hashPassword,
          profilePhoto: req.body.profilePhoto,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", success: true, error: false});
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

module.exports =  signup ;
