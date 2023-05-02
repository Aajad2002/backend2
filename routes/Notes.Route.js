const express = require('express');
const NoteModel = require("../models/Notes.Model")
const notesRouter = express.Router()

//post
notesRouter.post("/create", async (req, res) => {
    try {


        const note = new NoteModel(req.body)
        await note.save();
        res.send({ "msg": "New notes Created" })
    } catch (error) {
        res.send(error)
    }
})
notesRouter.get("/", async (req, res) => {
    try {

        const notes = await NoteModel.find({ authorID: req.body.authorID })
        res.send(notes)
    } catch (error) {
        res.send(error)
    }
})
//delete the data
notesRouter.delete("/delete/:id", async (req, res) => {
      let id=req.params.id;
      try {
        const note=await NoteModel.findOne({_id:id});
        if(note.authorID==req.body.authorID){
             await NoteModel.findByIdAndDelete({_id:id})
             res.send("Note Deleted successfully")
        }else{
            res.send("your are not authorized")
        }
      } catch (error) {
        res.send(error)
      }
})
//update the data;
notesRouter.delete("/update/:id", async (req, res) => {
    let id=req.params.id;
    try {
      const note=await NoteModel.findOne({_id:id});
      if(note.authorID==req.body.authorID){
           await NoteModel.findByIdAndUpdate({_id:id},req.body)
           res.send("Note updated successfully")
      }else{
          res.send("You are not authorized.")
      }
    } catch (error) {
      res.send(error)
    }
})
module.exports = notesRouter