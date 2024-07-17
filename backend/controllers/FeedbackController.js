// controllers/feedbackController.js
const Feedback = require("../models/Feedback");
// Create new feedback
const createFeedback = async (req, res) => {
  try {
    const { type, description, rating, isAnonymous, username, employeeId } =
      req.body;
    const user = req.userId;
    if (!user) {
      return res.status(400).json({
        message: "User is required",
        success: false,
        error: true,
      });
    } else if (!type || !description || !rating || !username || !employeeId) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    } else {
      if (type === "personal") {
        const feedback = new Feedback({
          user,
          type,
          description,
          rating,
          isAnonymous,
          projectName: req.body.projectName,
          employee: req.body.employee,
          username,
          employeeId: req.body.employeeId,
        });
        await feedback.save();
        res.status(201).json({
          message: "Feedback submitted successfully",
          data: feedback,
          success: true,
          error: false,
        });
      }
      if (type === "general") {
        const feedback = new Feedback({
          user,
          type,
          description,
          rating,
          isAnonymous,
        });
        await feedback.save();
        res.status(201).json({
          message: "Feedback submitted successfully",
          data: feedback,
          success: true,
          error: false,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, success: false, data: [] });
  }
};
const getAllFeedbacks = async (req, res) => {
  try {
    const user = req.userId;
    const feedbacks = await Feedback.find({ user });
    if (feedbacks) {
      res.status(200).json({
        message: "Feedbacks retrieved successfully",
        data: feedbacks,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, success: false, error: true });
  }
};
const receivedFeedbacks = async (req, res) => {
  try {
    const userId = req.userId;
    const feedbacks = await Feedback.find({ employeeId: userId });
    if (feedbacks && feedbacks.length > 0) {
      res.status(200).json({
        message: "Feedbacks retrieved successfully",
        data: feedbacks,
        success: true,
        error: false,
      });
    } else {
      res.status(200).json({
        message: "No feedbacks found",
        data: [],
        success: true,
        error: false,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, success: false, error: true });
  }
};
module.exports = {
  createFeedback,
  getAllFeedbacks,
  receivedFeedbacks,
};