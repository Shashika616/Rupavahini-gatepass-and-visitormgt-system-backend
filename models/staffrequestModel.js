const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffrequestSchema = new Schema({
    empId:{
        type: String,
        required: true,    
    },
    reason:{
        type: String,
        required: true,
    },
    currentDate:{
        type: Date,
        required: true,
        default: Date.now(),
        set: currentDate => new Date (currentDate).toISOString().slice(0, 10)

    },
    givenTimeout:{
        type: String,
        required: true,
    },
    givenTimein:{
        type: String,
        required: true,
    },
    details:{
        type: String,
    },
   
});

module.exports = mongoose.model('Staffrequest', staffrequestSchema);
