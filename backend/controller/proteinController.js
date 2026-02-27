import { User } from "../models/model.js";

// Add protein entry
export const addProteinLog = async (req, res) => {
    const { userId, date, protein } = req.body;

    if (!userId || !date || protein === undefined) {
        return res.status(400).json({
            success: false,
            message: "User ID, date, and protein amount are required"
        });
    }

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if entry for this date already exists
        const existingIndex = user.proteinLogs.findIndex(log => log.date === date);

        if (existingIndex !== -1) {
            // Update existing entry
            user.proteinLogs[existingIndex].protein = protein;
        } else {
            // Add new entry
            user.proteinLogs.push({ date, protein });
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Protein logged successfully",
            proteinLogs: user.proteinLogs
        });
    } catch (error) {
        console.error("Add protein error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Get protein history
export const getProteinLogs = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const proteinLogs = user.proteinLogs || [];

        // Sort by date (oldest first for chart display)
        const sortedLogs = proteinLogs
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        return res.status(200).json({
            success: true,
            proteinLogs: sortedLogs,
        });
    } catch (error) {
        console.error("Get protein history error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
