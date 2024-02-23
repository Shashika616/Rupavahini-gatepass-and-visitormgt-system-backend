require('dotenv').config();

const UserStaff = require('../models/userstaffModel');
const bcrypt = require('bcryptjs');  // Hash Library for password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailValidator = require("email-validator");


const JWT_SECRET = process.env.JWT_SECRET;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

const LoginStaff = async (req, res) => {
    const { empIDorEmail, password } = req.body;
  
    try {
      // Find the user by username or email
      const user = await UserStaff.findOne({
        $or: [
            { empID: empIDorEmail },
            { email: empIDorEmail }
        ]
    });
  
      if (!user) {
        return res.json({ error: "User not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      if (await bcrypt.compare(password, user.password)) {
        // Generate a JWT token
        const token = jwt.sign({ empID: user.empID }, JWT_SECRET, {
          expiresIn: "24h",
        });
  
        // Return the token in the response
        return res.status(201).json({ status: "ok", data: token });
      } else {
        // Incorrect password
        return res.json({ status: "error", error: "Invalid Password" });
      }
    } catch (error) {
      // Handle other errors
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports = LoginStaff;
  