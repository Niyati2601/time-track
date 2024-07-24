const Clocking = require("../models/Clock");

const editClockForAdmin = async (req, res) => {
  try {
    const clock = await Clocking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (clock) {
      res.status(200).json({
        message: "Clock updated successfully",
        success: true,
        error: false,
        data: clock,
      });
    } else {
      res.status(404).json({
        message: "Clock not found",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = editClockForAdmin;
