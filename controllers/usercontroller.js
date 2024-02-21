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
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // Google as our smtp service provider
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: NODEMAILER_USER,  // Get these values from environment variablle file
        pass: NODEMAILER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false // for localhost testing purpose only
    }
});


const userRegister = async(req,res)=>{
    const {username,fullname,email,contactNo,password,confirmpwd}= req.body;
    
    try {
    
            // Fullname format check
        if (!fullname || fullname.trim() === "") {
            console.log("Enter Your Full Name here");
            return res.send({ error: 'Required' });
          }
    
            // Email Validation
        if(!emailValidator.validate(email)){
            console.log("Not a valid Email");
            return res.send({error:'Invalid Email check again'});
    
        }
    
        const usedEmail = await User.findOne({email});
        if(usedEmail){
            return res.json({error:"This Email has already taken by another User"});
        }
    
            // Username used or not check
        const usedUsername = await User.findOne({username});
        if(usedUsername){
            return res.json({error:"This Usename is already being used try a different one"});
        }
    
            // Password format check
        const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!passwordformat.test(password)){
            console.log(" At least 6 characters  including uppercase, lowercase, and numeric characters");
            return res.send({error:"Password must consists at least 6 characters with uppercase, lowercase, and numeric characters"});
        }
    
        if (password !== confirmpwd) {
            console.log("Passwords Don.t Match");   //Double check the password
            return res.json({ error: 'Passwords do not match' });
          }
        
            // Contact number format check
        const contactNoFormat = /^\d{10}$/;
        if(!contactNoFormat.test(contactNo)){
            console.log("Invalid format for a mobile Number");
            return res.json({error: ' Invalid Mobile Number'});
        }
        
            // encrypt password
        const encryptedPassword = await bcrypt.hash(password,10);
    
        await User.create({
            username,
            fullname,
            email,
            contactNo,
            password:encryptedPassword,
        });

        res.status(200).send({ status: "ok" }); 
        }catch (error) {
            res.send({status:"error"})
        }
    };


    // New signup with email verification

    const signup = async (req, res) => {
        try {
            const { username, fullname, email, contactNo, password,confirmpwd } = req.body;
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Validations

                // Fullname format check
        if (!fullname || fullname.trim() === "") {
            console.log("Enter Your Full Name here");
            return res.send({ error: 'Required' });
          }
    
            // Email Validation
        if(!emailValidator.validate(email)){
            console.log("Not a valid Email");
            return res.send({error:'Invalid Email check again'});
    
        }
    
        const usedEmail = await User.findOne({email});
        if(usedEmail){
            return res.json({error:"This Email has already taken by another User"});
        }
    
            // Username used or not check
        const usedUsername = await User.findOne({username});
        if(usedUsername){
            return res.json({error:"This Usename is already being used try a different one"});
        }
    
            // Password format check
        const passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if(!passwordformat.test(password)){
            console.log(" At least 6 characters  including uppercase, lowercase, and numeric characters");
            return res.send({error:"Password must consists at least 6 characters with uppercase, lowercase, and numeric characters"});
        }
    
        if (password !== confirmpwd) {
            console.log("Passwords Don.t Match");   //Double check the password
            return res.json({ error: 'Passwords do not match' });
          }
        
            // Contact number format check
        const contactNoFormat = /^\d{10}$/;
        if(!contactNoFormat.test(contactNo)){
            console.log("Invalid format for a mobile Number");
            return res.json({error: ' Invalid Mobile Number'});
        }
        
            // encrypt password
        const encryptedPassword = await bcrypt.hash(password,10);

    
            const newUser = new User({
                username,
                fullname,
                email,
                contactNo,
                password : encryptedPassword,
            });
    
            // Generate verification token
            const verificationToken = Math.floor(100000 + Math.random() * 900000);
            newUser.verificationToken = verificationToken;
            newUser.verificationTokenExpires = Date.now() + 3600000; // 1 hour
    
            await newUser.save();
    
            // Send verification email
            await transporter.sendMail({
                from: NODEMAILER_USER,
                to: email,
                subject: 'Email Verification',
                text: `Please enter the following verification code on the sign-up page: ${verificationToken}`,
            });
    
            res.status(201).json({ message: 'User created successfully. Please verify your email.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    
    const verifyEmail = async (req, res) => {
        try {
            const { email, verificationToken } = req.body;
            const user = await User.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (user.isVerified) {
                return res.status(400).json({ message: 'Email already verified' });
            }
    
            if (user.verificationToken !== verificationToken || user.verificationTokenExpires < Date.now()) {
                return res.status(400).json({ message: 'Invalid or expired verification token' });
            }
    
            user.isVerified = true;
            user.verificationToken = null;
            user.verificationTokenExpires = null;
            await user.save();
    
            res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    

    const updateUser = async (req, res) => {
    console.log(req.body);
    const { username } = req.params; // Extract username from URL params
    const { fullname, email, contactNo } = req.body; // Extract updated user details from request body

    try {
        // Find the user by username
        let user = await User.findOne({ username });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

              // Email Validation
              if(!emailValidator.validate(email)){
                console.log("Not a valid Email");
                return res.send({error:'Invalid Email check again'});
        
            }
        
                 // Contact number validation
        const contactNoFormat = /^\d{10}$/;
        if(!contactNoFormat.test(contactNo)){
            console.log("Invalid format for a mobile Number");
            return res.json({error: ' Invalid Mobile Number'});
        }


        // Update user details
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (contactNo) user.contactNo = contactNo;

        // Handle image upload if provided
        if (req.file) {
            const uploadedImagePath = path.join(__dirname, '../uploads', req.file.filename);

            // Move the uploaded image to local storage
            fs.renameSync(req.file.path, uploadedImagePath);

            // Construct the image URL
            const imageRelativePath = `uploads/${req.file.filename}`;
            user.image = imageRelativePath;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ status: 'ok', data: user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePassword = async (req, res) => {
    console.log(req.body);
    const {username} = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the old password matches
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        // Encrypt the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { 
    updateUser,
    userRegister,
    signup,
    verifyEmail,
    updatePassword,
};


    