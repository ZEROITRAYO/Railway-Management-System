const express = require('express');
const empRouter = express.Router();
const { validationResult} = require('express-validator');
const empdb = require("./emp");
const rms = require("./connectdb");
const output = require("./outputs");
const moment = require('moment');

empRouter.use(express.json());
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.engine('ejs',require('ejs').__express)

var emp_id;

empRouter.post("/emplogin", async(req,res,next)=>{
    try {
        const empid = req.body.empid;
        emp_id = empid;
        const password = req.body.password;
        const email = req.body.email;
        const empLogin = await empdb.login(email,emp_id);
        console.log(empLogin);
        if (empLogin[0].emp_passwd === password){
            console.log("Correct Password!")
            res.sendFile(__dirname + "/Emp_login_next.html")
        }else{
            console.log("Invalid Password");
            res.send(output.invalid_passwd2);
        }    
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

empRouter.get("/viewtrains", async (req,res,next)=>{
    try {
        rms.query("SELECT * FROM train_tt WHERE date_of_journey >= CURDATE()", (error, result1)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               var jsonresponse = JSON.parse(JSON.stringify(result1));
               for(var i=0; i < jsonresponse.length; i++){
                var old_date = (jsonresponse[i].date_of_journey);
                var new_date = moment(old_date).format('YYYY-MM-DD');
                jsonresponse[i].date_of_journey = new_date;
               }
                res.render(__dirname + '/views/viewtrains.ejs',{jsonresponse});
                console.log(jsonresponse);
                return (console.log(result1));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/viewpassengers", async (req,res,next)=>{
    try {
        const train_id = req.body.train_id;
        const journey_date = req.body.date_of_journey;
        rms.query("CALL fetch_passengers(?,?)", [train_id,journey_date], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               var jsonresponse = JSON.parse(JSON.stringify(result[0]));
                res.render(__dirname + '/views/viewpassengers.ejs',{jsonresponse});
                console.log(jsonresponse);
                return (console.log(result[0]));
            //    return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/updatefare", async (req,res,next)=>{
    try {
        const train_id = req.body.train_id;
        const class_name = req.body.class_name;
        const new_fare = req.body.new_fare;
        rms.query("UPDATE seats SET fare = ? WHERE train_id = ? AND class_name = ?", [new_fare,train_id,class_name], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               res.send(output.fare_updated);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/traintimetable", async (req,res,next)=>{
    try {
        const choice = req.body.time_change;
        if (choice==="departure_time"){
            res.sendFile(__dirname + "/change_dept.html");
        }else if (choice==="arrival_time"){
            res.sendFile(__dirname + "/change_arrival.html");
        }else{
            res.sendFile(__dirname + "/change_TT.html");
        }
        // res.redirect(choice);
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/updatedeparture", async (req,res,next)=>{
    try {
        const train_id = req.body.train_id;
        const journey_date = req.body.date_of_journey;
        const new_departure = req.body.new_departure;
        rms.query("CALL update_train_departure(?,?,?)", [train_id,journey_date,new_departure], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               res.send(output.departure_updated);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/updatearrival", async (req,res,next)=>{
    try {
        const train_id = req.body.train_id;
        const journey_date = req.body.date_of_journey;
        const new_arrival = req.body.new_arrival;
        rms.query("CALL update_train_arrival(?,?,?)", [train_id,journey_date,new_arrival], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               res.send(output.arrival_updated);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.post("/trainrevenue", async (req,res,next)=>{
    try {
        const train_id = req.body.train_id;
        // const journey_date = req.body.date_of_journey;
        rms.query("SELECT calculate_train_revenue(?) AS revenue", [train_id], (error, result)=>{
           if(error){
               return (error);
           }else{
            const revenue = Number(Object.values(result[0]));
            const train_revenue = `<!DOCTYPE html>
<html>
<head>
<title>Train Revenue</title>
<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
<div class="container">
<h1></h1>
<a href="emphome" class="nav-btn">Go Back To Home Page</a>
</div>
<script> alert("Total Revenue Generated By The Train = Rs. ${revenue}") </script>
</body>
</html>`;
               res.send(train_revenue);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

empRouter.get("/empappraisal", async (req,res,next)=>{
    try {
        //const emp_id = req.body.emp_id;
        rms.query("SELECT calculate_employee_bonus(?) AS bonus", [emp_id], (error, result)=>{
           if(error){
               return (error);
           }else{
            const bonus = Number(Object.values(result[0]));
            const emp_bonus = `<!DOCTYPE html>
<html>
<head>
<title>Employee Appraisal</title>
<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
<div class="container">
<h1></h1>
<a href="emphome" class="nav-btn">Go Back To Home Page</a>
</div>
<script> alert("Congratulations! You will receive a Festive Bonus of Rs. ${bonus}/- . RMS wishes you joyous holidays!") </script>
</body>
</html>`;
               res.send(emp_bonus);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});



module.exports = empRouter;