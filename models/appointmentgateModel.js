const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentgateSchema = new Schema({
    currentDate: {
        type: Date,
        required: true,
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
    visitorName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Appointmentgate", appointmentgateSchema);