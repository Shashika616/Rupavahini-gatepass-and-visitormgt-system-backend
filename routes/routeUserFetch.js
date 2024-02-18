const express = require("express");
const router = express.Router();

const {userstaffRegister} = require("../controllers/fetchuserdatacontroller");
const UserData = require("../controllers/fetchuserdatacontroller");

router.post("/userData",UserData.UsersData);
router.get("/requser/:username",UserData.GetUsersData);
router.post("/userdataheader",UserData.UsersDatafromheader);

module.exports = router;