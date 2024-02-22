const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: {
    type: String,
    required: true,
    unique: true,   
   },

   fullname:{
    type: String,
    required: true,
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
    password:{
     type: String,
     required: true,
    },
   image:{
    type: String,
   },
   
   isVerified: {
      type: Boolean,
      default: false,
  },
  verificationToken: {
      type: String,
  },
  verificationTokenExpires: {
      type: Date,
  },

});

//module.exports = mongoose.model('User', userSchema);

const User = mongoose.model('User', userSchema);

    module.exports = User;