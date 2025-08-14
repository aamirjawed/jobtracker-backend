import cron from 'node-cron'
import Reminder from '../models/reminderModel.js'
import User from '../models/userModel.js'
import EmailService from './emailService.js'


class schedulerService{
    constructor(){
        this.running =false
    }

    // start the reminder
    start(){
        if(this.running){
            console.log("Scheduler is running");
            return;
        }

        console.log("Start reminder scheduler")


        // check for reminders every minute
        cron.schedule('* * * * *', () => {
            this.checkReminders();
        })

        this.running = true
        console.log("Reminder scheduler started successfully")
    
    }

    // check any reminders are due off 
        async checkReminders(){
            try {
                const now   = new Date()
                const currentDate = this.formatDate(now)
                const currentTime = this.formatTime(now)

                console.log(`Checking reminders for ${currentDate} at ${currentTime}`)


                const dueReminders = await Reminder.findAll({
                    where:{
                        reminderDate:currentDate,
                        reminderTime:currentTime,
                        reminderStatus:"Pending"
                    },
                    include:[{
                        model:User,
                        attributes:['email', "name"]
                    }]
                })


                // if we found reminder due
                if(dueReminders.length >0){
                    console.log(`Found ${dueReminders.length} reminders to send`);

                    for(const reminder  of dueReminders){
                        await this.sendReminder(reminder)
                    }
                }
            } catch (error) {
                console.error('Error checking reminders in checkReminders in scheduler services', error.message);
            }
        }


        // send a single reminder
        async sendReminder(reminder){
            try {
                console.log(` Sending reminder: ${reminder.reminderName} to ${reminder.User.email}`);

                const emailResult = await EmailService.sendReminderEmail(
                    reminder.User.email,
                    {
                        reminderName:reminder.reminderName,
                        reminderMessage:reminder.reminderMessage,
                        reminderTime: reminder.reminderTime,
                        reminderDate: reminder.reminderDate
                    }
                );


                // check if email was sent successfully
                if(emailResult.success){
                    await reminder.update({
                        reminderStatus:"Sent"
                    })
                 console.log(`Reminder sent successfully to ${reminder.User.email}`);
                }else{
                    console.error(`Failed to send reminder to ${reminder.User.email}:`, emailResult.error);

                    // Mark reminder as failed

                    await reminder.update({
                        reminderStatus:'Failed'
                    })

                }
            } catch (error) {
                console.error('Error send reminder in scheduler services', error.message);
            }
        }
        // Helper function to format date as YYYY-MM-DD
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Helper function to format time as HH:MM
  formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Get status of the scheduler
  getStatus() {
    return {
      isRunning: this.running,
      currentTime: new Date().toISOString(),
      message: this.running ? 'Scheduler is running' : 'Scheduler is stopped'
    };
  }

  // Stop the scheduler (if needed)
  stop() {
    this.running = false;
    console.log('Scheduler stopped');
  }
}


// Export a single instance
export default new schedulerService();
        
