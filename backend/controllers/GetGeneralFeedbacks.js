const Feedback = require("../models/Feedback");

const GetGeneralFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({type: "general"}).populate("user");

        if (feedbacks) {
            return res.status(200).json({
                success: true,
                error: false,
                data: feedbacks,
                message: "Feedbacks",
            });
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "No feedbacks found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
        })
    }
}

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        if (feedbacks) {
            return res.status(200).json({
                success: true,
                error: false,
                data: feedbacks,
                message: "Feedbacks",
            });
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "No feedbacks found",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
        })
    }
}

module.exports = {GetGeneralFeedbacks, getAllFeedbacks};