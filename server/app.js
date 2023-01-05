require('dotenv').config({path : './config/config.env'})
const express= require("express")
const connectDB = require("./config/db")
var path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use("/admin/",require("./routes/admin"))
app.use("/product/",require("./routes/product"))
app.use("/order/",require("./routes/order"))
app.use("/user/",require("./routes/user"))
app.use("/auth/",require("./routes/auth"))

app.listen(3001, ()=>{
    console.log("app is runnig on port 3001...")
})