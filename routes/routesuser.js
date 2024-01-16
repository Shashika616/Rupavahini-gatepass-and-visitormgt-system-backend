const express = require("express");
const router = express.Router();

const {userRegister} = require("../controllers/usercontroller");

router.post("userRegister",userRegister);

module.exports = router;