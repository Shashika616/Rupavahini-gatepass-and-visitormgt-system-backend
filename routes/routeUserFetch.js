const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/fetchuserdatacontroller");
const UserData = require("../controllers/fetchuserdatacontroller");

router.post("/userData",UserData);

module.exports = router;