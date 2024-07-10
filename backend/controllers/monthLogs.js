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

    if (logs) {
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
    }

    const totalDurationInMs = logs.reduce((total, log) => {
      if (log.duration !== "-") {
        const [hours, minutes] = log.duration.split(":").map(Number);
        return total + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
      }
      return total;
    }, 0);

    const totalHours = Math.floor(totalDurationInMs / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const totalMinutes = Math.floor(
      (totalDurationInMs % (1000 * 60 * 60)) / (1000 * 60)
    )
      .toString()
      .padStart(2, "0");

    const totalDuration = `${totalHours}:${totalMinutes}`;

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
