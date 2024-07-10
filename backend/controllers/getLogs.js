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
      totalDuration: totalDuration,
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
