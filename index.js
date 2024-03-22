const express = require('express');
const bodyParser = require("body-parser");
const mysql = require("mysql");
const db = require("./connectdb");
const userRout = require("./userRouter");
const empRout = require("./empRouter");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(userRout);
app.use(empRout);




app.listen(port,() => console.log("Listening on port 3000"));

app.get('/', (req,res) => res.sendFile(__dirname + "/Home.html"));
app.get('/user', (req,res) => res.sendFile(__dirname + "/user.html"));
app.get('/userlogin', (req,res) => res.sendFile(__dirname + "/User_login.html"));
app.get('/userregister', (req,res) => res.sendFile(__dirname + "/new_user.html"));
app.get('/emplogin', (req,res) => res.sendFile(__dirname + "/Emp_login.html"));
app.get('/userhome', (req,res) => res.sendFile(__dirname + "/user_login_next.html"));
app.get('/emphome', (req,res) => res.sendFile(__dirname + "/Emp_login_next.html"));
app.get('/findtrains', (req,res) => res.sendFile(__dirname + "/Find_trains.html"));
//app.get('/viewbookings', (req,res) => res.sendFile(__dirname + "/userbookings.html"));
app.get('/cancelbookings', (req,res) => res.sendFile(__dirname + "/cancel_bookings.html"));
app.get('/userprofile', (req,res) => res.sendFile(__dirname + "/user_profile.html"));
app.get('/viewtrains', (req,res) => res.sendFile(__dirname + "/empviewtrains.html"));
app.get('/viewpassengers', (req,res) => res.sendFile(__dirname + "/view_pas.html"));
app.get('/updatefare', (req,res) => res.sendFile(__dirname + "/change_fare.html"));
app.get('/traintimetable', (req,res) => res.sendFile(__dirname + "/change_TT.html"));
app.get('/updatedeparture', (req,res) => res.sendFile(__dirname + "/change_dept.html"));
app.get('/updatearrival', (req,res) => res.sendFile(__dirname + "/change_arrival.html"));
app.get('/trainrevenue', (req,res) => res.sendFile(__dirname + "/chk_revenue.html"));
app.get('/empappraisal', (req,res) => res.sendFile(__dirname + "/chk_appraisal.html"));
