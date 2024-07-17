const Feedback = require("../models/Feedback");

const GetGivenFeedbacksById = async (req, res) => {
    try {
        const user = req.params.id;
        const feedbacks = await Feedback.find({ user });

        if (feedbacks) {
            return res.status(200).json({
                success: true,
                error: false,
                data: feedbacks,
                message: "Feedbacks",
            });
        } else {
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
        });
    }
};

module.exports = GetGivenFeedbacksById;