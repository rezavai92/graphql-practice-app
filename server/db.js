const mongoose = require('mongoose')

const url = "mongodb+srv://rezavai:1234@cluster0.ljemu.mongodb.net/Bookstore?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(error,response)=>{

if(error){

    return console.log(error)
}

console.log("db connected")
})
