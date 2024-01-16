const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/stafflogincontroller");
const LoginStaff = require("../controllers/stafflogincontroller");

router.post("LoginStaff",LoginStaff);

module.exports = router;