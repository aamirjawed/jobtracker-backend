import express from 'express'
import { deleteReminder, getAllReminder, getSpecificReminder, reminderController, updateReminderDetails } from '../controllers/reminderController.js'
import authUser from '../middleware/authMiddleware.js'


const router = express.Router()

router.use(authUser)

router.post("/reminder",  reminderController)
router.get("/reminder",  getAllReminder)
router.get("/reminder/:reminderId", getSpecificReminder)
router.put("/reminder/:reminderId", updateReminderDetails)
router.delete("/reminder/:reminderId", deleteReminder)

export default router


