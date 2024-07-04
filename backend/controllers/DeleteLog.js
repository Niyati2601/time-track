const TimeLog = require("../models/TimeLog");

const deleteLog = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                message: "Id is required",
                success: false,
                error: true,
            });
        }
        const timeLog = await TimeLog.findByIdAndDelete(_id);
        if (!timeLog) {
            return res.status(404).json({
                message: "Task not found",
                success: false,
                error: true,
            });
        }
        return res.status(200).json({
            message: "Task Deleted Successfully",
            success: true,
            error: false,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
};

module.exports = deleteLog;