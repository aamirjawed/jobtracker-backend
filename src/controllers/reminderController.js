import Reminder from "../models/reminderModel.js";


export const reminderController = async(req , res) => {
    const {reminderName, reminderMessage, reminderTime,reminderDate, reminderStatus} = req.body

    if(!reminderName || !reminderMessage || !reminderTime || !reminderStatus ||!reminderDate){
        return res.status(400).json({
            success:false,
            error:"Missing fields",
            message:"All fields are required"
        })
    }


    try {
        const id = req.userId;

        const reminder  = await Reminder.create({
            reminderName,
            reminderMessage,
            reminderTime,
            reminderDate,
            reminderStatus,
            userId:id
        })

        res.status(201).json({
            success:true,
            message:"Reminder created successfully",
            data:reminder
        })
    } catch (error) {
        console.log("Error in reminder controller",error.message)
        console.log("Full error of reminder controller", error)
        res.status(500).json({
            success:false,
            error:"Internal server error",
            message:"Server error while creating reminder"
        })
    }
}


export const getAllReminder = async (req, res) => {
    try {
        const id = req.userId
        const allReminder = await Reminder.findAll({where:{userId:id}})

        if(!allReminder){
            console.log("No data available")
        }

        res.status(200).json({
            success:true,
            message:"All reminder retrieved",
            data:allReminder
        })
    } catch (error) {
        console.log("Error in get all reminder in reminder controller", error.message)
        console.log("Full error of get all reminder", error)
        res.status(500).json({
            success:false,
            error:"Internal server error",
            message:"Something went wrong while fetching all reminders"
        })
    }
}


export const getSpecificReminder = async(req , res) => {
   const {reminderId} = req.params

   if(!reminderId){
    res.status(404).json({
        success:false,
        error:"Reminder does not exist",
        message:"The reminder you are looking for does not exist"
    })
   }

   try {
    const reminder = await Reminder.findByPk(reminderId)

    if(!reminder){
        return res.status(404).json({
            success:false,
            message:"Reminder not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"Reminder retrieved successfully",
        data:reminder
    })
   } catch (error) {
        console.log("Error in get specific reminder in reminder controller", error.message)
        console.log("Full error of get specific reminder", error)
        res.status(500).json({
            success:false,
            error:"Internal server error",
            message:"Something went wrong while fetching reminder"
        })
   }
}

export const updateReminderDetails = async (req, res) => {
  try {
    const reminderId = req.params.reminderId;
    const id = req.userId;

    const reminder = await Reminder.findOne({
      where: { userId:id, id:reminderId }
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found or you don't have permission to update it"
      });
    }

    
    await reminder.update({
      reminderStatus: "Sent",
      updatedAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: "Reminder updated automatically",
      data: reminder
    });
  } catch (error) {
    console.log("Error in update reminder", error.message)
    console.log("full error of update reminder", error)
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating reminder"
    });
  }
};



export const deleteReminder = async(req, res)=> {
    const reminderId = req.params.reminderId;
    const id = req.userId

    try {
        const reminder = await Reminder.findOne({
            where:{userId:id, id:reminderId}
        })

        if(!reminder){
            return res.status(404).json({
                success:false,
                message:"Reminder not found or you don't have the permission to delete"
            })
        }

        await reminder.destroy()

        await reminder.save();


        return res.status(200).json({
            success:true,
            message:"Reminder deleted successfully",
            data:reminder
        })
    } catch (error) {
        console.log("Error in deleting reminder", error.message)
        console.log("Full error of delete reminder", error)
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting the reminder"
        })
    }
}

// also write controller to send email for reminder