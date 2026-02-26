import { User } from "../models/model.js";

// Add weight entry
export const addWeight = async (req, res) => {
  const { userId, date, weight, unit } = req.body;

  if (!userId || !date || !weight) {
    return res.status(400).json({
      success: false,
      message: "User ID, date, and weight are required"
    });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if entry for this date already exists
    const existingIndex = user.weightLogs.findIndex(log => log.date === date);

    if (existingIndex !== -1) {
      // Update existing entry
      user.weightLogs[existingIndex].weight = weight;
      user.weightLogs[existingIndex].unit = unit || 'kg';
    } else {
      // Add new entry
      user.weightLogs.push({ date, weight, unit: unit || 'kg' });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Weight logged successfully",
      weightLogs: user.weightLogs
    });
  } catch (error) {
    console.error("Add weight error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get weight history
export const getWeightHistory = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const weightLogs = user.weightLogs || [];

    // Sort by date (oldest first for chart display)
    const sortedLogs = weightLogs
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate stats
    let stats = {
      starting: null,
      current: null,
      change: 0,
      highest: null,
      lowest: null
    };

    if (sortedLogs.length > 0) {
      const weights = sortedLogs.map(log => log.weight);
      stats.starting = sortedLogs[0].weight;
      stats.current = sortedLogs[sortedLogs.length - 1].weight;
      stats.change = stats.current - stats.starting;
      stats.highest = Math.max(...weights);
      stats.lowest = Math.min(...weights);
    }

    return res.status(200).json({
      success: true,
      weightHistory: sortedLogs,
      stats
    });
  } catch (error) {
    console.error("Get weight history error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
