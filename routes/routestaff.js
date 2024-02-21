const express = require("express");
const router = express.Router();
const multer = require('multer');

const {userstaffRegister, updateStaff, updatePassword, signup, verifyEmail } = require("../controllers/userstaffcontroller");

const upload = multer({ dest: 'uploads/' });

router.post("/userstaffRegister",userstaffRegister);
router.put('/userstaff/:empID',upload.single('image'), updateStaff);
router.put('/updatestaffpassword/:empID',updatePassword);
router.post('/signupstaff', signup);
router.post('/verify-email-staff', verifyEmail);

module.exports = router;