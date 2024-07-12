const timeLog = require("../models/TimeLog");

const getCustomLogs = async (req, res) => {
  try {
    const user = req.userId;
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    // Convert to UTC and reset to the start of the day
    const startUTC = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()));

    const end = endDate ? new Date(endDate) : new Date(startDate);
    // Convert to UTC and set to the end of the day
    const endUTC = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999));

    if (isNaN(startUTC) || isNaN(endUTC)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid date format",
      });
    }

    const logs = await timeLog.find({
      user,
      startTIme: { $gte: startUTC, $lte: endUTC },
    });

    if (logs && logs.length > 0) {
      logs.forEach((log) => {
        if (!log.endTIme || !log.startTIme) {
          log.duration = "-";
        } else {
          const durationInMs = new Date(log.endTIme) - new Date(log.startTIme);
          const hours = Math.floor(durationInMs / (1000 * 60 * 60))
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor(
            (durationInMs % (1000 * 60 * 60)) / (1000 * 60)
          )
            .toString()
            .padStart(2, "0");
          log.duration = `${hours}:${minutes}`;
        }
      });
      return res.status(200).json({
        success: true,
        error: false,
        data: logs,
        message: "Logs",
      });
    } else {
      return res.status(200).json({
        success: false,
        error: true,
        message: "No logs found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = getCustomLogs;
