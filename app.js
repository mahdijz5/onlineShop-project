const express= require("express")
const app = express()

app.use("/",(req,res) => {
    res.status(200).json({
        "test" : "hello deer"
    })
})

app.listen(3001, ()=>{
    console.log("app is runnig on port 3001...")
})