const express = require("express");
const router = express.Router();

const {
    createappointmentrequest,
    getAppRequestByUsername,
    deleteAppRequest,
    } = require("../controllers/appointmentreqcontroller");

    router.post("/",createappointmentrequest);
    router.get("/:username",getAppRequestByUsername);
    router.delete("/:id",deleteAppRequest);

    module.exports = router;