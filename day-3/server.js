const express = require("express")

const app = express()

app.use(express.json())

const notes = []

app.post("/note",(req,res) => {
    notes.push(req.body)
    console.log(notes)
    res.send("notes created")
})

app.get("/note",(req,res) => {
    res.send(notes)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})