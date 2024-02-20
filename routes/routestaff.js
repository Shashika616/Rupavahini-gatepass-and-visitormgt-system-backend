const express = require("express");
const router = express.Router();
const multer = require('multer');

const {userstaffRegister, updateStaff } = require("../controllers/userstaffcontroller");

const upload = multer({ dest: 'uploads/' });

router.post("/userstaffRegister",userstaffRegister);
router.put('/userstaff/:empID',upload.single('image'), updateStaff);

module.exports = router;