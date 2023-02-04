// so that we can use mongoose
const mongoose = require('mongoose');

// creating schema
var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})

// creating a variable userdb and assiging schema to that 
const Userdb = mongoose.model('userdb',schema);

// finally returning that
module.exports = Userdb;