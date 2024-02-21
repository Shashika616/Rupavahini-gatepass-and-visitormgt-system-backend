const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitrupavahiniSchema = new Schema({
    requestID: {
        type: String,
        //required: true,  
         },
   
    category: {
    type: String,
    //required: true,  
     },

    username: {
        type: String,
        //required: true,  
         },

    dateofArrival:{
     type: Date,
     //required: true,
     set: dateofArrival => new Date (dateofArrival).toISOString().slice(0, 10)

    },
    timeslot:{
     type: String,
     //required: true,
    },
    name:{
     type: String,
    // required: true,
    },
    grade:{
        type: String,
       
        },
    address:{
        type: String,
        //required: true,
    },

    authorizedPerson:{
        type: String,
        //required: true,
    },

    designation:{
        type: String,
        //required: true,
    },

    phoneNo:{
        type: [String],
        //required: true,
    },

    noOfmale:{
        type: Number,
        //required: true,
    },
    noOffemale:{
        type: Number,
        //required: true,
    },

    noOfteachers:{
        type: Number,
       // required: true,
    },

    noOfparents:{
        type: Number,
       // required: true,
    },

    note:{
        type: String,
        
    },


    
    });

    module.exports = mongoose.model('Visitrupavahini', visitrupavahiniSchema);