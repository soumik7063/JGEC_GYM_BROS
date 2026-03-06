import express from "express";
import { getLeaderboard, triggerUpdate } from "../controller/leaderboardController.js";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.post("/update", triggerUpdate); // Manual trigger for testing

export default leaderboardRouter;
