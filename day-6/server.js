const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://sumitkr0514_db_user:d4qNIhnXvv84sYSV@cluster0.sermlv4.mongodb.net/day-6").then(()=>{
        console.log("Database Connected")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("Server is connected to port 3000")
})
