const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/userlogincontroller");
const LoginUser = require("../controllers/userlogincontroller");

router.post("/LoginUser",LoginUser);

module.exports = router;