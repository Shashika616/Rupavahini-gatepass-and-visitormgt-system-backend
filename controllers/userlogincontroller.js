require('dotenv').config();

const User = require("../models/userModel");
const bcrypt = require('bcryptjs');  // Hash Library for password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailValidator = require("email-validator");

const JWT_SECRET = process.env.JWT_SECRET;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

const LoginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user with the provided username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.json({ error: "User not found" });
      }
      // Check if the user's email is verified
    if (!user.isVerified) {
      return res.json({ error: "Please verify your email before logging in" });
    }
  
      // Compare the provided password with the hashed password in the database
      if (await bcrypt.compare(password, user.password)) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {
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
  
  

  module.exports = LoginUser;
  