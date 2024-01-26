const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appoinmentSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    requesterName:{
        type: String,
        required: true,
    },
    requesteremail:{
        type: String,
        required: true,
    },
    requesterNIC:{
        type: String,
        required: true,
    },
    requesterPhoneno:{
        type: String,
        required: true,
    },
    officerName:{
        type: String,
        required: true,
    },

    appoinmentDate:{
        type: Date,
        required: true,
    },
    appoinmentTime:{
        type: String,
        required: true,
    },
    appoinmentReason:{
        type: String,
        required: true,
    },
    
});
    
module.exports = mongoose.model('Appoinment', appoinmentSchema);