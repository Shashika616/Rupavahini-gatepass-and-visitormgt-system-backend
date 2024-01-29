const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/userstaffcontroller");

router.post("/userstaffRegister",userstaffRegister);

module.exports = router;