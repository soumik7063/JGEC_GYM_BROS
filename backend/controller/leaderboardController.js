import { User } from "../models/model.js";
import { updateLeaderboard } from "../services/leaderboardService.js";

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({})
            .sort({ consistencyScore: -1 })
            .select('name consistencyScore rank streak lastWorkoutDate');
        
        return res.status(200).json({ success: true, leaderboard: users });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const triggerUpdate = async (req, res) => {
    try {
        await updateLeaderboard();
        return res.status(200).json({ success: true, message: "Leaderboard updated manually" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export { getLeaderboard, triggerUpdate };
