const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffcomplaintSchema = new Schema({
    empId:{
        type: String,
        required: true,
        
    },
    title:{
        type: String,
        required: true,
    },
    complaintDate:{
        type: Date,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Staffcomplaint', staffcomplaintSchema);