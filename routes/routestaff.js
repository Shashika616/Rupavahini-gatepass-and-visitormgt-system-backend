const express = require("express");
const router = express.Router();

const {userstaffRegister, updateStaff } = require("../controllers/userstaffcontroller");

router.post("/userstaffRegister",userstaffRegister);
router.put('/userstaff/:empID', updateStaff);

module.exports = router;