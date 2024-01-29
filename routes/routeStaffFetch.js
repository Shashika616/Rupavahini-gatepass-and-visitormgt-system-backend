const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/fetchstaffdatacontroller");
const staffData = require("../controllers/fetchstaffdatacontroller");

router.post("/StaffData",staffData.StaffData);
router.get("/staff/:empID",staffData.GetStaffData);

module.exports = router;