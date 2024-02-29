const User = require("../models/userModel");
const bcrypt = require('bcryptjs');  // Hash Library for password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailValidator = require("email-validator");

const JWT_SECRET = process.env.JWT_SECRET;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;


// Forget Password Controller
const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        });
        const link = `http://localhost:4000/reset-password/${oldUser._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: NODEMAILER_USER, // Replace with your Gmail email
                pass: NODEMAILER_PASSWORD // Replace with your Gmail password
            }
        });

        var mailOptions = {
            from: NODEMAILER_USER, // Replace with your Gmail email
            to: oldUser.email,
            subject: 'Password Reset',
            text: link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.send({ status: "Email has been sent" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Reset Password Before Submit Controller
const ResetPasswordBeforeSubmit = async (req, res) => {
    const { id, token } = req.params;
    try {
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const verify = jwt.verify(token, secret);
        res.json({ email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.error(error);
        res.status(400).send("Link is Expired");
    }
};

// Reset Password After Submit Controller
const ResetPasswordAfterSubmit = async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
        return res.status(400).json({ status: "Password not matched with confirm password" });
    }
    try {
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = JWT_SECRET + oldUser.password;
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: encryptedPassword,
                },
            }
        );
        res.json({ email: verify.email, status: "Password Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something Went Wrong");
    }
};

module.exports = {
    ForgetPassword,
    ResetPasswordBeforeSubmit,
    ResetPasswordAfterSubmit
};