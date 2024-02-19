const express = require("express");
const router = express.Router();
const multer = require('multer');

const {userRegister, updateUser} = require("../controllers/usercontroller");

const upload = multer({ dest: 'uploads/' });

router.post("/userRegister",userRegister);
router.put('/update-user/:username',upload.single('image'),updateUser );

module.exports = router;