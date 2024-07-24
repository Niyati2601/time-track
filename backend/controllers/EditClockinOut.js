const Clocking = require("../models/Clock");

const editClockForAdmin = async (req, res) => {
  try {
    // Find and update the clock entry with the new data
    const clock = await Clocking.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!clock) {
      return res.status(404).json({
        message: "Clock not found",
        success: false,
        error: true,
      });
    }

    // Calculate the new duration if clock in or clock out time is changed
    if (req.body.clockInTime || req.body.clockOutTime) {
      const clockInTime = new Date(clock.clockInTime);
      const clockOutTime = new Date(clock.clockOutTime);
      
      // Calculate the total duration in minutes
      const totalMinutes = (clockOutTime - clockInTime) / (1000 * 60);
      
      // Calculate hours and minutes
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.floor(totalMinutes % 60);

      // Format duration as "hr:min"
      const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

      // Update the clock object with the new duration
      clock.duration = formattedDuration;

      // Save the updated clock object
      await clock.save();
    }

    res.status(200).json({
      message: "Clock updated successfully",
      success: true,
      error: false,
      data: clock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = editClockForAdmin;
