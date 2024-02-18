const express = require("express");
const router = express.Router();

const {userRegister, updateUser} = require("../controllers/usercontroller");

router.post("/userRegister",userRegister);
router.put('/update-user/:username',updateUser );

module.exports = router;