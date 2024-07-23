const timeLog = require("../models/TimeLog");

const GetUserLogsById = async (req, res) => {
  try {
    const user = req.params.id;
    const logs = await timeLog.find({ user });

    if (!logs || logs.length === 0) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "No logs found",
      });
    }

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
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = GetUserLogsById;
