import dotenv from 'dotenv'
import express from 'express'
import db from './db/db-connection.js'
import authRoutes from './routes/authRoutes.js'



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


app.use('/api/v1/user', authRoutes)

db.sync().then(() => {
    app.listen(PORT, ()=>{
    console.log(`Server is running on: ${PORT}`)
})
}).catch((err) => {
    console.log("Error in db sync in app js", err.message)
});






