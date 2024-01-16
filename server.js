require('dotenv').config();

const express = require("express");
//express app
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");


app.use(express.json());
app.use(cors());
/* 
    app.use(
        cors({
        origin : "http://localhost:3000",
         credentials: true,
        })
    ); 
                                     
 */

// Setting a view engine    
app.set("view engine","ejs"); // Express use EJS template engine by default

const MongoURL = process.env.MongoURL;

// Connecting to Database

mongoose
        .connect(MongoURL)
        .then(()=>{
            console.log("Database Connected Successfully");
        })
        .catch(e=>console.log(e));


//listen for requests

app.listen(process.env.PORT, () => {
    console.log('Server Running');
})
