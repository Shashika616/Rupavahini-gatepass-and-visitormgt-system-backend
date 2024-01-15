const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userstaffSchema = new Schema({
    empId:{
        type: String,
        required: true,
        unique: true,
    },

    username: {
     type: String,
     required: true,
     unique: true,   
    },
    
   
    email:{
     type: String,
     required: true,
     unique: true,
    },

    contactNo:{
     type: [String],
     required: true,
     unique: true,
    },

    division:{
        type: String,
        required: true,
    },

     password:{
      type: String,
      required: true,
     },

    image:{
     type: Buffer,
    },
    
    });

    module.exports = mongoose.model('Userstaff', userstaffSchema);