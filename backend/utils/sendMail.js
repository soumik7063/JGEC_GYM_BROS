import nodemailer from "nodemailer";

// Create a transporter using SMTP settings from .env
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email using the configured transporter.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
export const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SUPPROT_EMAIL || process.env.SMTP_USER,
            to,
            subject,
            html,
        });
        console.log(`Email sent: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Sends a welcome email to a newly registered user.
 * @param {string} email - User's email address
 * @param {string} name - User's name
 */
export const sendWelcomeEmail = async (email, name) => {
    const subject = "Welcome to JGEC GYM BROS!";
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333; text-align: center;">Welcome to JGEC GYM BROS, ${name}!</h2>
            <p style="color: #555; line-height: 1.6;">
                We are thrilled to have you join our community. JGEC GYM BROS is your ultimate companion for tracking workouts, monitoring protein intake, and achieving your fitness goals.
            </p>
            <p style="color: #555; line-height: 1.6;">
                Get started today by creating your first workout template or exploring our curated exercises.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Go to Dashboard
                </a>
            </div>
            <p style="color: #777; font-size: 14px; text-align: center;">
                If you have any questions, feel free to reply to this email.
            </p>
            <p style="color: #777; font-size: 12px; text-align: center; margin-top: 30px;">
                &copy; ${new Date().getFullYear()} JGEC GYM BROS. All rights reserved.
            </p>
        </div>
    `;

    sendMail(email, subject, html).catch(err => console.error("Welcome email failed:", err));
};
