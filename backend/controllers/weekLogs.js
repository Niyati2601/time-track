const timeLog = require("../models/TimeLog");

const weekLogs = async (req, res) => {
  try {
    const user = req.userId;
    const today = new Date();
    const week = new Date(today.setDate(today.getDate() - 7));

    const startOfDay = new Date(week.setHours(0, 0, 0, 0));

    const logs = await timeLog.find({
      user,
      createdAt: { $gt: startOfDay },
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: logs,
      message: "Logs of week fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = weekLogs;
