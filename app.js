require('dotenv').config({path : './config/config.env'})
const express= require("express")
const connectDB = require("./config/db")
const session = require("express-session")
const { setHeader } = require('./middlewares/headers')

const app = express()

//Body parser 
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//headers
app.use(setHeader)

//connect database
connectDB()

//routes
app.use("/user/",require("./routes/user"))
app.use("/admin/",require("./routes/admin"))

app.listen(3001, ()=>{
    console.log("app is runnig on port 3001...")
})