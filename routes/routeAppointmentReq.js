const express = require("express");
const router = express.Router();

const {
    createappointmentrequest,
    getAppRequestByUsername,
    deleteAppRequest,
} = require("../controllers/appointmentreqcontroller");

router.post("/createappoinment/:username", createappointmentrequest);
router.get("/appointmentreq/:username", getAppRequestByUsername);
router.delete("/deleteappoinment/:id", deleteAppRequest);

module.exports = router;
