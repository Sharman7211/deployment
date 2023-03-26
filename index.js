const express= require("express")
const {connection}= require("./db")
const  {userRouter}= require("./routes/user.routes")
const {noteRouter}= require("./routes/note.routes")
const {authenticate}= require("./middlewares/auth.middleware")
require("dotenv").config()
const app= express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
    await connection
    console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log(`Server running at ${process.env.port}`)
})