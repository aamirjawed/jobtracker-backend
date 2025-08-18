import express from 'express'
import { createNewCompany, deleteCompanyDetails, getAllCompany, getSingleCompany, updateCompanyDetails } from '../controllers/companyControllers.js'
import authUser from '../middleware/authMiddleware.js'


const router = express.Router()
router.use(authUser)
router.post('/companies', createNewCompany)
router.get('/companies', getAllCompany)
router.get('/companies/:companyId', getSingleCompany)
router.put('/companies/:companyId', updateCompanyDetails)
router.delete('/companies/:companyId', deleteCompanyDetails)



export default router