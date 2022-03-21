const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required: true,
        minlength: 3,
        maxlength:100
    },
    lname:{
        type:String,
        required: true,
        minlength: 3,
        maxlength:100
    },
    email:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:100,
    },
    password:{
        type:String,
        required: true,
        minlength: 6,
        maxlength:100,
    },
    role:{
        type:String,
        required: true,
        minlength: 3,
        maxlength:20
    },
    
    date:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('users',userSchema)