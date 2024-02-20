const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userstaffSchema = new Schema({
    empID:{
        type: String,
        required: true,
        unique: true,
    },

    username: {
     type: String,
     
    },
    
   
    email:{
     type: String,
     required: true,
     unique: true,
    },

    contactNo:{
     type: [String],
     required: true,
   
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
     type: String,
    },
    
    });

    //module.exports = mongoose.model('Userstaff', userstaffSchema);

    const UserStaff = mongoose.model('Userstaff', userstaffSchema);

    module.exports = UserStaff;