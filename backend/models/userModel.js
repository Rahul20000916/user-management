const mongoose = require('mongoose');

const User = new mongoose.Schema({
    image:{
        type : String,
    },
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    dob:{
        type : String,
    },
    gender:{
        type : String,
    },
    blocked:{
        type : Boolean,
    },
    quote:{
        type : String
    }
},{collection : 'user-data'});

const model = mongoose.model('UserData', User);

module.exports = model;