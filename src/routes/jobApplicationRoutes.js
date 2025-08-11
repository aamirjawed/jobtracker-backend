import express from 'express'
import { newJobApplication, viewAllApplications } from '../controllers/jobApplicationController.js'
import authUser from '../middleware/authMiddleware.js'


const router = express.Router()

router.use(authUser)


router.post('/job-applications', newJobApplication)
router.get('/job-applications', viewAllApplications)

export default router