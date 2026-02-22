import { User } from "../models/model.js";

export const createTemplate = async (req, res) => {
    const { userId, name, exercises } = req.body;
    if (!userId || !name || !exercises || exercises.length === 0) {
        return res.status(400).json({ success: false, message: "User ID, template name, and exercises are required" });
    }

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if template with the same name already exists
        const existingTemplate = user.customTemplates.find(t => t.name.toLowerCase() === name.toLowerCase());
        if (existingTemplate) {
            return res.status(400).json({ success: false, message: "A template with this name already exists" });
        }

        user.customTemplates.push({ name, exercises });
        await user.save();

        return res.status(200).json({ success: true, message: "Template created successfully", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const deleteTemplate = async (req, res) => {
    const { userId, name } = req.body;
    if (!userId || !name) {
        return res.status(400).json({ success: false, message: "User ID and template name are required" });
    }

    try {
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const templateIndex = user.customTemplates.findIndex(t => t.name === name);
        if (templateIndex === -1) {
            return res.status(404).json({ success: false, message: "Template not found" });
        }

        user.customTemplates.splice(templateIndex, 1);
        await user.save();

        return res.status(200).json({ success: true, message: "Template deleted successfully", user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
