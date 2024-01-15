const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const divisionadminSchema = new Schema({
    empId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: [String],
        required: true,
        unique: true,
    },
    division: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: false,
    },
    position: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Divisionadmin", divisionadminSchema);