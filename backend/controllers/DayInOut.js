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

const postDayOut = async (req, res) => {
  try {
    const {userId} = req.body;
    const dayOut = await dayInOut.findOne({ userId, dayOut: null });
    if (!dayOut) {
      return res.status(404).json({ message: "No active day-in found" });
    }
    dayOut.dayOut = new Date();
    const durationMs = dayOut.dayOut - dayOut.dayIn;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const duration = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    dayOut.duration = duration;
    await dayOut.save();
    res.status(200).json({
      message: "Day-out successful",
      dayOut,
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
}

module.exports = { postDayIn , postDayOut};
