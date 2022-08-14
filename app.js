require('dotenv').config({path : './config/config.env'})
const express= require("express")
const connectDB = require("./config/db")
var path = require('path');
const session = require("express-session")
const fileUpload = require('express-fileupload');
const { setHeader } = require('./middlewares/headers')

const app = express()

//Body parser 
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//middleware
app.use(fileUpload())

//headers
app.use(setHeader)

//connect database
connectDB()

//public
express.static(path.join(__dirname, 'public'));

//routes
app.use("/user/",require("./routes/user"))
app.use("/admin/",require("./routes/admin"))

app.listen(3001, ()=>{
    console.log("app is runnig on port 3001...")
})