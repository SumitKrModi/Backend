const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes);
    
    res.send("notes created")
    
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    
    res.send("note deleted")
    
})

app.get("/",(req,res)=>{
    res.send("Hello World")
})

module.exports = app