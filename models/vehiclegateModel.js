const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehiclegateSchema = new Schema({
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
    vehicleNo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Vehiclegate", vehiclegateSchema);