const timeLog = require("../models/TimeLog");

const getAllLogs = async (req, res) => {
    try {
        const user = req.userId; 
        const logs = await timeLog.find({user});
        if (logs) {
            return res.status(200).json({
                success: true,
                error: false,
                data: logs,
                message: "Logs",
            })
        }else{
            return res.status(404).json({
                success: false,
                error: true,
                message: "No logs found",
            })
        }        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || error,
        })
    }
    
}

module.exports = getAllLogs