require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const studentRouter = require('./routes/student') 
const mongoose = require('mongoose')

app.use(express.json())

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (errorMessage) => console.log(errorMessage))
db.once('open',()=>console.log('Connection Established'))

app.get('/',(request,response)=>{
    response.status(200).send('This is App.js')
})

app.use('/api/v1/students',studentRouter)


app.listen(PORT)

console.log(`This is Student Enrollment http://localhost:${PORT}`)