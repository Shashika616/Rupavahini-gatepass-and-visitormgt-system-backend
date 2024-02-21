const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitrupavahinigateSchema = new Schema({
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
    orgName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Visitrupavahinigate", visitrupavahinigateSchema);