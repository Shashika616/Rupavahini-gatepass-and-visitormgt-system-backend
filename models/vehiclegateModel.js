const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehiclegateSchema = new Schema({
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
    vehicleNo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Vehiclegate", vehiclegateSchema);