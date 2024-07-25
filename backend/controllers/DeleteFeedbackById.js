const Feedback = require("../models/Feedback");

const deleteFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByIdAndDelete(id);
        if (feedback) {
            return res.status(200).json({
                success: true,
                error: false,
                data: feedback,
                message: "Feedback Deleted",
            });
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Feedback Not Found",
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

module.exports = deleteFeedbackById