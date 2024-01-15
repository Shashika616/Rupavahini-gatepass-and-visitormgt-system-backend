const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentgateSchema = new Schema({
    currentDate: {
        type: Date,
        required: true,
    },
    inOut: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    visitorName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Appointmentgate", appointmentgateSchema);