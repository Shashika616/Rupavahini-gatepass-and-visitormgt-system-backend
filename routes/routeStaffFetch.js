const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/fetchstaffdatacontroller");
const StaffData = require("../controllers/fetchstaffdatacontroller");

router.post("/StaffData",StaffData);

module.exports = router;