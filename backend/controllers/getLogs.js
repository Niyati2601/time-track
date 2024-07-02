const timeLog = require("../models/TimeLog");

const getLogs = async (req, res) => {
  try {
    const user = req.userId;
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const logs = await timeLog.find({
      user,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: logs,
      message: "Logs",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getLogs;
