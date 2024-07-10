const timeLog = require("../models/TimeLog");

const weekLogs = async (req, res) => {
  try {
    const user = req.userId;
    const date = new Date();

    // Get the current day of the week (0 - Sunday, 6 - Saturday)
    const currentDay = date.getDay();
    

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(date);
    
    startOfWeek.setDate(date.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

    // Calculate the end of the week (Saturday)
    const endOfWeek = new Date(startOfWeek);
    
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the day

    // Fetch logs within the current week
    const logs = await timeLog.find({
      user,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });

    // Calculate durations and total duration
    logs.forEach((log) => {
      if (!log.endTIme || !log.startTIme) {
        log.duration = "-";
      } else {
        const durationInMs = new Date(log.endTIme) - new Date(log.startTIme);
        const hours = Math.floor(durationInMs / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        log.duration = `${hours}:${minutes}`;
      }
    });

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

    // Respond with the logs and total duration
    return res.status(200).json({
      success: true,
      error: false,
      data: logs,
      totalDuration: totalDuration,
      message: "Logs of the week fetched successfully",
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