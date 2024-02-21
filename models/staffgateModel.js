const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffgateSchema = new Schema({
    currentDate: {
        type: Date,
        required: true,
        default: Date.now(),
        set: currentDate => new Date (currentDate).toISOString().slice(0, 10)

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