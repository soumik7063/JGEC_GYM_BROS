import { Post } from "../models/postModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(50);
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const toggleFistBump = async (req, res) => {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
        return res.status(400).json({ success: false, message: "Post ID and User ID are required" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const index = post.fistBumps.indexOf(userId);
        if (index === -1) {
            post.fistBumps.push(userId);
        } else {
            post.fistBumps.splice(index, 1);
        }

        await post.save();
        res.status(200).json({ success: true, fistBumps: post.fistBumps });
    } catch (error) {
        console.error("Error toggling fist bump:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
