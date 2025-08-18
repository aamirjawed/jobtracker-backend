import dotenv from 'dotenv'
import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import db from './db/db-connection.js'
import authRoutes from './routes/authRoutes.js'
import profileManageRoutes from './routes/profileManageRoutes.js'
import jobApplicationRoutes from './routes/jobApplicationRoutes.js'
import reminderRoutes from './routes/reminderRoutes.js'
import schedulerService from './service/schedulerService.js'
import testEmailRoute from './routes/testEmailRoutes.js';
import companyRoutes from './routes/companyRoutes.js'
import jobListingRoutes from './routes/jobListingRoutes.js'




dotenv.config({
    path:'./.env'
})


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

app.use(cookieParser())

// auth routes
app.use('/api/v1/user', authRoutes)

// user manage profile routes 
app.use('/api/v1/user', profileManageRoutes)

// job application routes 
app.use('/api/v1/user', jobApplicationRoutes )

// reminder routes
app.use('/api/v1/user', reminderRoutes)

// email test route
app.use('/api/v1/test', testEmailRoute);

// company routes
app.use('/api/v1/', companyRoutes)

// job listing routes
app.use('/api/v1', jobListingRoutes)



db.sync().then(() => {
    app.listen(PORT, ()=>{
    console.log(`Server is running on: ${PORT}`)

    schedulerService.start()
})
}).catch((err) => {
    console.log("Error in db sync in app js", err.message)
});






