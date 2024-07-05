const dayInOut = require("../models/DayInOut");

const postDayIn = async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const dayIn = new dayInOut({
        userId,
        dayIn: new Date(),
      });
      
      await dayIn.save();
      res.status(201).json({
        message: "Day-in successful",
        dayIn,
        success: true,
        error: false,
      });
    } else {
      res
        .status(400)
        .json({ message: "userId is Required", success: false, error: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
};

module.exports = { postDayIn };
