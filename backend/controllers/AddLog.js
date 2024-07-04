const TimeLog = require("../models/TimeLog");

const addLog = async (req, res) => {
  try {
    const { user, projects, startTIme, endTIme, title, tags } = req.body;
    if (!user) {
      return res.status(400).json({
        message: "User is required",
        success: false,
        error: true,
      });
    }
    if (!projects || !title || !tags) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    } else {
      const timeLog = new TimeLog({
        user,
        projects,
        startTIme,
        endTIme,
        title,
        tags,
      });

      await timeLog.save();

      res.status(201).json({
        message: "Task Added Successfully",
        data: timeLog,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

const updateEndTimeInTimeLog = async (req, res) => {
  try {
    const { _id, endTIme } = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "Id is required",
        success: false,
        error: true,
      });
    }
    if (!endTIme) {
      return res.status(400).json({
        message: "End time is required",
        success: false,
        error: true,
      });
    }

    const timeLog = await TimeLog.findOneAndUpdate(
      { _id },
      { endTIme },
      { new: true }
    );
    if (timeLog) {
      return res.status(200).json({
        message: "End time updated successfully",
        data: timeLog,
        success: true,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: "Time log not found",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true });
  }
};

module.exports = { addLog, updateEndTimeInTimeLog };
