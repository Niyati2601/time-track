// controllers/clockingController.js
const { error } = require('console');
const Clocking = require('../models/Clock');

const clockIn = async (req, res) => {
  try {
    const { userId } = req.body;
    const clocking = new Clocking({
      userId,
      clockInTime: new Date()
    });
    await clocking.save();
    res.status(201).json({
      message: 'Clock-in successful',
      clocking,
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clockOut = async (req, res) => {
  try {
    const { userId } = req.body;
    const clocking = await Clocking.findOne({ userId, clockOutTime: null });
    if (!clocking) {
      return res.status(404).json({ message: 'No active clock-in found' });
    }
    clocking.clockOutTime = new Date();
    const durationMs = clocking.clockOutTime - clocking.clockInTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    clocking.duration = duration;
    await clocking.save();
    res.status(200).json({
      message: 'Clock-out successful',
      clocking,
      success: true,
      error: false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clockInAndOut = async (req, res) => {
    try {
        const { userId } = req.body;
        const history = await Clocking.find({ userId }).sort({ clockIn: -1 });
        res.status(200).json({ success: true, history, error: false, message: 'Clock History fetched successfully!!' });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch clock history', error: err.message });
      }
};

module.exports = { clockIn, clockOut, clockInAndOut };
