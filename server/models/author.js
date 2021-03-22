const mongoose = require('mongoose')
const Schema = mongoose.Schema
const authorSchema = new Schema({
    
    name:{
        type:String,
        required:true,
        trim:true
    },

   
   age:{
       type : Number,
       required : true
   }

   
})

const Author = mongoose.model('gqlauthors',authorSchema)
module.exports = Author;
