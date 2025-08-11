import dotenv from 'dotenv'
import express from 'express'
import db from './db/db-connection.js'



dotenv.config({
    path:'./.env'
})


const app = express()
const PORT = process.env.PORT || 3000




db.sync({force:true}).then(() => {
    app.listen(PORT, ()=>{
    console.log(`Server is running on: ${PORT}`)
})
}).catch((err) => {
    console.log("Error in db sync in app js", err.message)
});






