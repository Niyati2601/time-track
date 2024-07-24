const Clocking = require("../models/Clock");

const editClock = async (req, res) => {
  try {
    const { userId, clockInTime, clockOutTime } = req.body;
    const changeTime = Clocking.findByIdAndUpdate(
        userId,
      { clockInTime, clockOutTime },
      { new: true }
    );
    if (changeTime) {
      return res.status(200).json({
        success: true,
        message: "Clock-in time updated successfully",
        changeTime,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Clock-in time not updated",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { editClock };
