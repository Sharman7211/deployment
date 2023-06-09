const express=require("express")

const {UserModel}= require("../models/user.model")
const jwt= require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body

    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err) res.send({"msg":err.message})
            else{
                const user= new UserModel({name,email,pass:hash})
                await user.save()
                
              res.send({"msg":"New User has been registered"})

            }
        });
     
    
    }catch(err){
   
        res.send({"msg":err.message})
    }
    // res.send({"msg":"New User has been registered"})
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=(req.body)
  try{
    
    const user= await UserModel.find({email})
    if(user){
        bcrypt.compare(pass, user[0].pass, (err, result)=> {
            if(result) {
                let token=jwt.sign({userID:user[0]._id},"masai")
                res.send({"msg":"User has been logged in!","token":token})
            }else{
                res.send({"msg":"something went wrong"}) 
            }
        });
       
    }else{
        res.send({"msg":"Wrong Credentials"})
    }

  }catch(err){
    res.send({"msg":err.message})
  }
})

module.exports={
    userRouter
}