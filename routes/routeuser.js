const express = require("express");
const router = express.Router();
const multer = require('multer');

const {userRegister, updateUser, updatePassword } = require("../controllers/usercontroller");

const upload = multer({ dest: 'uploads/' });

router.post("/userRegister",userRegister);
router.put('/update-user/:username',upload.single('image'),updateUser );
router.put('/updateuserpwd/:username', updatePassword);

module.exports = router;