const express = require('express');
const router = express.Router();
const {
    ForgetPassword,
    ResetPasswordBeforeSubmit,
    ResetPasswordAfterSubmit
} = require('../controllers/userforgotpasswordcontroller');

const {
    staffForgetPassword,
    staffResetPasswordBeforeSubmit,
    staffResetPasswordAfterSubmit
}=require('../controllers/staffforgotpasswordcontroller');

// Route for initiating password reset
router.post('/forget-password', ForgetPassword);

// Route for rendering the page where users can input the new password
router.get('/reset-password/:id/:token', ResetPasswordBeforeSubmit);

// Route for handling submission of the new password
router.post('/reset-password/:id/:token', ResetPasswordAfterSubmit);

// Route for initiating password reset
router.post('/staffforget-password', staffForgetPassword);

// Route for rendering the page where users can input the new password
router.get('/staffreset-password/:id/:token', staffResetPasswordBeforeSubmit);

// Route for handling submission of the new password
router.post('/staffreset-password/:id/:token', staffResetPasswordAfterSubmit);

module.exports = router;
