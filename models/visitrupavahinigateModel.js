const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitrupavahinigateSchema = new Schema({
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
    orgName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Visitrupavahinigate", visitrupavahinigateSchema);