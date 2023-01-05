// require('dotenv').config({path : './config/config.env'})
// const express= require("express")
// const connectDB = require("./config/db")
// var path = require('path');
// const fileUpload = require('express-fileupload');
// const { setHeader } = require('./middlewares/headers')

// const app = express()

// //Body parser 
// app.use(express.urlencoded({extended : false}))
// app.use(express.json())

// //middleware
// app.use(fileUpload())

// //headers
// app.use(setHeader)

// //connect database
// connectDB()

// //routes
// // app.use("/auth/",require("./routes/auth"))


// app.listen(3002, ()=>{
//     console.log("Authntication server is runnig on port 3002...")
// })