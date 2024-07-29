const TimeLog = require("../models/TimeLog");

const editLog = async (req, res) => {
    try {
        const { _id, projects, tags, title, startTIme, endTIme } = req.body;
        if (!_id) {
            return res.status(400).json({
                message: "Id is required",
                success: false,
                error: true,
            });
        }
        if (startTIme > endTIme) {
            return res.status(400).json({
                message: "Start time cannot be greater than end time",
                success: false,
                error: true,
            });
        } else if (startTIme === endTIme) {
            return res.status(400).json({
                message: "Start time cannot be equal to end time",
                success: false,
                error: true,
            });
        }
        const timeLog = await TimeLog.findByIdAndUpdate(
            _id,
            { projects, tags, title, startTIme, endTIme },
            { new: true }
        );
        if (!timeLog) {
            return res.status(404).json({
                message: "Task not found",
                success: false,
                error: true,
            });
        }
        return res.status(200).json({
            message: "Log updated successfully",
            data: timeLog,
            success: true,
            error: false,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
};

const editLogAdmin = async (req,res) => {
    try {
        const user = req.params.id
        const timeLog = await TimeLog.findByIdAndUpdate(user, req.body, { new: true });
        if (!timeLog) {
            return res.status(404).json({
                message: "Task not found",
                success: false,
                error: true,
            });
        }
        return res.status(200).json({
            message: "Log updated successfully",
            data: timeLog,
            success: true,
            error: false,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: error.message || error, success: false, error: true });
    }
};



module.exports = { editLog, editLogAdmin };