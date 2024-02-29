const express = require('express');
const router = express.Router();
const {
    ForgetPassword,
    ResetPasswordBeforeSubmit,
    ResetPasswordAfterSubmit
} = require('../controllers/userforgotpasswordcontroller');

// Route for initiating password reset
router.post('/forget-password', ForgetPassword);

// Route for rendering the page where users can input the new password
router.get('/reset-password/:id/:token', ResetPasswordBeforeSubmit);

// Route for handling submission of the new password
router.post('/reset-password/:id/:token', ResetPasswordAfterSubmit);

module.exports = router;
