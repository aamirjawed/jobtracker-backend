import dotenv from 'dotenv'
import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import db from './db/db-connection.js'
import authRoutes from './routes/authRoutes.js'
import profileManageRoutes from './routes/profileManageRoutes.js'
import jobApplicationRoutes from './routes/jobApplicationRoutes.js'




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



db.sync().then(() => {
    app.listen(PORT, ()=>{
    console.log(`Server is running on: ${PORT}`)
})
}).catch((err) => {
    console.log("Error in db sync in app js", err.message)
});






