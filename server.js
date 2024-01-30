require('dotenv').config();

const express = require("express");
//express app
const app = express();
const Routes = require("./routes/routeStaffFetch")
const Routes2 = require("./routes/routeStaffLogin")
const Routes3 = require("./routes/routeUserFetch")
const Routes4 = require("./routes/routeUserLogin")
const Routes5 = require("./routes/routestaff")
const Routes6 = require("./routes/routeuser")
const Routes7 = require("./routes/routeAppointmentReq")
const Routes8 = require("./routes/routeVisitRupavahiniReq")
const Routes9 = require("./routes/routeStaffReq")
const Routes10 = require("./routes/routeStaffComplaint")

const mongoose = require("mongoose");

const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(Routes);
app.use(Routes2);
app.use(Routes3);
app.use(Routes4);
app.use(Routes5);
app.use(Routes6);
app.use(Routes7);
app.use(Routes8);
app.use(Routes9);
app.use(Routes10);


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
