import express from 'express'
import { deleteApplication, getSpecificApplication, newJobApplication, updateApplication, viewAllApplications } from '../controllers/jobApplicationController.js'
import authUser from '../middleware/authMiddleware.js'
import {upload} from '../middleware/multerMiddleware.js'


const router = express.Router()

router.use(authUser)


router.post('/job-application', upload.single('file'),newJobApplication)
router.get('/job-application', viewAllApplications)
router.get('/job-application/:applicationId', getSpecificApplication)
router.put('/job-application/:applicationId', updateApplication)
router.delete('/job-application/:applicationId', deleteApplication)

export default router