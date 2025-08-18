import express from 'express'
import { deleteDetailsOfSingleJob, detailsOfSingleJob, getAllJobs, getAllJobsForSpecificCompany, listNewJob, updateDetailsOfSingleJob } from '../controllers/jobListingControllers.js'
import authUser from '../middleware/authMiddleware.js'


const router = express.Router()

router.use(authUser)

router.post('/companies/:companyId/jobs', listNewJob)
router.get('/companies/:companyId/jobs', getAllJobsForSpecificCompany)
router.get('/jobs', getAllJobs )
router.get('/jobs/:jobId', detailsOfSingleJob)
router.put('/jobs/:jobId', updateDetailsOfSingleJob)
router.delete('/jobs/:jobId', deleteDetailsOfSingleJob)


export default router