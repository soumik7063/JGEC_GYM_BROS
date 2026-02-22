import { User } from "../models/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Clerk Auth Sync (existing logic)
export const clerkAuth = async (req, res) => {
    const { userId, name, email } = req.body;
    if (!userId || !name || !email) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ userId });
        if (user) {
            return res.status(200).json({ success: true, message: "User synced successfully", user });
        }
        const newUser = new User({
            userId,
            name,
            email
        });
        await newUser.save();
        return res.status(200).json({ success: true, message: "User created and synced successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

// Manual Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userId: email, // Using email as fallback userId for manual users
        });

        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                userId: newUser.userId
            },
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Manual Login
export const manualLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userId: user.userId
            },
            token
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get Current User
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default clerkAuth;