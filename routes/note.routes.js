const express=require("express")
const {NoteModel}=require("../models/note.model")
const noteRouter=express.Router()


noteRouter.get("/",async(req,res)=>{
    const notes= await NoteModel.find()
    res.send(notes)
})


noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note= new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`Note with Id ${noteID} has been deleted`})
})

module.exports={
    noteRouter
}