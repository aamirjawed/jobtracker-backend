import EmailService from '../service/emailService.js';

export const sendTestEmail = async (req, res) => {
    const { to, reminderName, reminderMessage, reminderDate, reminderTime } = req.body;

    if (!to || !reminderName || !reminderMessage || !reminderDate || !reminderTime) {
        return res.status(400).json({
            success: false,
            message: "All fields are required: to, reminderName, reminderMessage, reminderDate, reminderTime"
        });
    }

    try {
        const result = await EmailService.sendReminderEmail(to, {
            reminderName,
            reminderMessage,
            reminderDate,
            reminderTime
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: 'Test email sent successfully',
                data: result
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to send test email',
                error: result.error,
                details: result.details
            });
        }
    } catch (error) {
        console.error("Error sending test email:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
