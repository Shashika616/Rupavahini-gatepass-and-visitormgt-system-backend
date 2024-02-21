require('dotenv').config();

const UserStaff = require("../models/userstaffModel");
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


const userstaffRegister = async(req,res)=>{
    const {empID,username,email,contactNo,division,password,confirmpwd}= req.body;
    
    try {
        
           // EmployeeID format check
        const empIDformat = /^\d{5,}$/;
        if(!empIDformat.test(empID)){
            console.log("Invalid format for a Employee Number");
            return res.json({error: 'Invalid Employee Number'});
        }

        const usedempID = await UserStaff.findOne({empID});
        if(usedempID){
            return res.json({error:"This empoyee ID is already being used try a different one"});
        }

            // Fullname format check
        if (!username || username.trim() === "") {
            console.log("Enter Your Full Name here");
            return res.send({ error: 'Required' });
          }

            // Email Validation
        if(!emailValidator.validate(email)){
            console.log("Not a valid Email");
            return res.send({error:'Invalid Email check again'});
    
        }

    
        const usedEmail = await UserStaff.findOne({email});
        if(usedEmail){
            return res.json({error:"This Email has already taken by another User"});
        }
    

            // Username used or not check
        const usedUsername = await UserStaff.findOne({username});
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
            return res.json({error: 'Enter Invalid Mobile Number'});
        }

        
            // encrypt password
        const encryptedPassword = await bcrypt.hash(password,10); 

    
        await UserStaff.create({
            empID,
            username,
            email,
            contactNo,
            division,
            password:encryptedPassword,

        });

            

        res.status(200).send({ status: "ok" });
        }catch (error) {
            res.send({status:"error"})
            console.log(error);
        }
    };


const updateStaff = async (req, res) => {
    console.log(req.body);
    const { empID } = req.params; // Extract empID from URL params
    const { username, division, email, contactNo } = req.body; // Extract updated user details from request body

    try {
        // Find the user by empID
        let user = await UserStaff.findOne({ empID });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

             // Email Validation
             if(!emailValidator.validate(email)){
                console.log("Not a valid Email");
                return res.send({error:'Invalid Email check again'});    
            }
    
            const usedEmail = await UserStaff.findOne({email});
            if(usedEmail){
                return res.json({error:"This Email has already taken by another User"});
            }

                 // Contact number format check
            const contactNoFormat = /^\d{10}$/;
            if(!contactNoFormat.test(contactNo)){
                console.log("Invalid format for a mobile Number");
                return res.json({error: 'Enter Invalid Mobile Number'});
            }

            const usedcontactNo = await UserStaff.findOne({contactNo});
            if(usedcontactNo){
                return res.json({error:"This Contact Number has already taken by another User"});
            }

        // Update user details
        if (username) user.username = username; // Update username if provided
        if (division) user.division = division;
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
    const {empID} = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by empID
        const userstaff = await UserStaff.findOne({ empID });

        // If user doesn't exist, return error
        if (!userstaff) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the old password matches
        const isPasswordMatch = await bcrypt.compare(oldPassword, userstaff.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        // Encrypt the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        userstaff.password = hashedPassword;
        await userstaff.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { 
    updateStaff,
    userstaffRegister,
    updatePassword,
};


    