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

    

const updateUser = async (req, res) => {
    const { username } = req.params; // Extract username from URL params
    const { fullname, email, contactNo } = req.body; // Extract updated user details from request body

    try {
        // Find the user by username
        let user = await User.findOne({ username });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
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

module.exports = { 
    updateUser,
    userRegister,
};


    