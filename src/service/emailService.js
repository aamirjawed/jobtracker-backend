// emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
    constructor(){
        this.fromEmail = process.env.FROM_EMAIL;
    }

    async sendReminderEmail(userEmail, reminderData ){
        try {
            const { reminderName, reminderMessage, reminderTime, reminderDate } = reminderData;
            const msg = {
                to: userEmail,
                from: {
                    email: this.fromEmail, // fixed
                    name: "Track Apply"
                },
                subject: `Reminder: ${reminderName}`,
                text: `
                    Hi there! 
                    This is your scheduled reminder: ${reminderName}

                    Message : ${reminderMessage}

                    Scheduled For : ${reminderDate} at ${reminderTime}

                    Have a great day!
                    Best regards,
                    Track Apply Team
                `
            };

            const result = await sgMail.send(msg);
            console.log("Email sent successfully:", result[0].statusCode);
            return {
                success: true,
                messageId: result[0].headers['x-message-id']
            };
        } catch (error) {
            console.error('Error sending email:', error);
            return { 
                success: false, 
                error: error.message,
                details: error.response?.body || 'Unknown error'
            };
        }
    }
}

export default new EmailService(); // <-- export instance
