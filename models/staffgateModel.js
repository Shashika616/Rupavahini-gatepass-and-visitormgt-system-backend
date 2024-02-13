const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffgateSchema = new Schema({
    currentDate: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    inOut: {    
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    VehicleNo: {
        type: String,
    },
    empId: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        
    },
});

module.exports = mongoose.model("Staffgate", staffgateSchema);