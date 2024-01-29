require('dotenv').config();

const Userstaff = require("../models/userstaffModel");
const bcrypt = require('bcryptjs');  // Hash Library for password
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const emailValidator = require("email-validator");

const JWT_SECRET = process.env.JWT_SECRET;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

const userstaffRegister = async(req,res)=>{
    const {empID,name,email,contactNo,division,password,confirmpwd}= req.body;
    
    try {

           // EmployeeID format check
        const empIDformat = /^\d{8}$/;
        if(!empIDformat.test(empID)){
            console.log("Invalid format for a Employee Number");
            return res.json({error: 'Invalid Employee Number'});
        }
    
            // Fullname format check
        if (!name || name.trim() === "") {
            console.log("Enter Your Full Name here");
            return res.send({ error: 'Required' });
          }
    
            // Email Validation
        if(!emailValidator.validate(email)){
            console.log("Not a valid Email");
            return res.send({error:'Invalid Email check again'});
    
        }
    
        const usedEmail = await Userstaff.findOne({email});
        if(usedEmail){
            return res.json({error:"This Email has already taken by another User"});
        }
    
            // Username used or not check
        const usedUsername = await Userstaff.findOne({username});
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
    
        await Userstaff.create({
            empID,
            name,
            email,
            contactNo,
            division,
            password:encryptedPassword,
        });

        res.send({status:"ok"}) 
        }catch (error) {
            res.send({status:"error"})
        }
    };

    exports.userstaffRegister = userstaffRegister;