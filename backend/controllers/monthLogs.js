const timeLog = require("../models/TimeLog");

const monthLogs = async (req, res) => {
  try {
    const user = req.userId;
    const today = new Date();
    
    // Calculate the start of the month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const logs = await timeLog.find({
      user,
      createdAt: { $gt: startOfMonth },
    });

    return res.status(200).json({
      success: true,
      error: false,
      data: logs,
      message: "Logs of the month fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = monthLogs;
