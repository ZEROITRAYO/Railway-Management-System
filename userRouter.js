const express = require('express');
const userRouter = express.Router();
const { validationResult} = require('express-validator');
const userdb = require("./user");
const rms = require("./connectdb");
const moment = require('moment');
const output = require("./outputs");

userRouter.use(express.json());
const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.engine('ejs',require('ejs').__express)


var usermail;
var gettrains_origin;
var gettrains_destination;
var gettrains_trainid;
var gettrains_date;


userRouter.post("/userregister", async function(req, res, next){
   try {
       const errors = validationResult(req);
       // try {
           
       // } catch (error) {
       //     next(err)
       // }
       // const{name, email, passwd} = req.body;
       const fname = req.body.first_name;
       const lname = req.body.last_name;
       const email = req.body.email;
       const passwd = req.body.password;
       const confirm_passwd = req.body.confirm_password;

       const user = await userdb.newUser(email,fname,lname,passwd,confirm_passwd);
       console.log(user);
       res.sendFile(__dirname + "/User_login.html");
    } 
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

userRouter.post("/userlogin", async(req,res,next)=>{
    try {
        // const {username, password} = req.body;
        const email = req.body.email;
        usermail = email;
        const password = req.body.password;
        const userLogin = await userdb.login(email);
        console.log(userLogin);
        if (userLogin[0].passwd === password){
            console.log("Correct Password!")
            res.sendFile(__dirname + "/user_login_next.html")
        }else{
            console.log("Invalid Password")
            res.send(output.invalid_passwd);
        }    
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

// userRouter.post("/findtrains", async (req,res,next)=>{
//     try {
//         //const email = req.body.email;
//         const origin = req.body.origin;
//         const destination = req.body.destination;
//         const journey_date = req.body.date_of_journey;
//         rms.query("CALL get_trains(?,?)",[origin,destination], (error, result)=>{
//             if(error){
//                 return (error);
//             }else{
//                 // console.log(result[0]);
//                 // res.send(result);
//                 var jsonresponse = JSON.parse(JSON.stringify(result[0]));
//                 res.render(__dirname + '/views/gettrains.ejs', {jsonresponse});
//                 // console.log(jsonresponse);
//                 return (console.log(result[0]));
//             }
//         })
//    } catch (error) {
//        console.log(error);
//        res.sendStatus(400);
//    }
// });

userRouter.post("/findtrains", async (req,res,next)=>{
    try {
        //const email = req.body.email;
        const origin = req.body.origin;
        gettrains_origin = origin;
        const destination = req.body.destination;
        gettrains_destination = destination;
        const journey_date = req.body.date;
        gettrains_date = journey_date;
        console.log(gettrains_date);
        rms.query("CALL get_trains(?,?,?)",[gettrains_origin,gettrains_destination,gettrains_date], (error, result)=>{
            if(error){
                return (error);
            }else{
                var jsonresponse = JSON.parse(JSON.stringify(result[0]));
                for(var i=0; i < jsonresponse.length; i++){
                    var old_date = (jsonresponse[i].date_of_journey);
                    var new_date = moment(old_date).format('YYYY-MM-DD');
                    jsonresponse[i].date_of_journey = new_date;
                }
                res.render(__dirname + '/views/gettrains1.ejs', {jsonresponse});
                return (console.log(result[0]));
            }
        })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

// userRouter.post("/gettrains2", async (req,res,next)=>{
//     try {
//         const trainid = Object.keys(req.body);
//         gettrains_trainid = String(trainid[0]);
//         console.log('Train ID : ',gettrains_trainid);
//         rms.query("CALL get_trains(?,?)",[gettrains_origin,gettrains_destination], (error, result)=>{
//             if(error){
//                 return (error);
//             }else{
//                 // console.log(result[0]);
//                 // res.send(result);
//                 var jsonresponse = JSON.parse(JSON.stringify(result[0]));
//                 res.render(__dirname + '/views/gettrains2.ejs', {jsonresponse});
//                 // console.log(jsonresponse);
//                 return (console.log(result[0]));
//             }
//         })
//    } catch (error) {
//        console.log(error);
//        res.sendStatus(400);
//    }
// });

userRouter.post("/checkavailability", async (req,res,next)=>{
    try {
        const trainid = Object.keys(req.body);
        gettrains_trainid = String(trainid[0]);
        console.log('Train ID : ',gettrains_trainid);
        console.log('Date Of Journey:', gettrains_date);
        rms.query("SELECT class_name, fare, get_available_seats(?,class_name) AS available_seats FROM seats WHERE train_id = ?;",[gettrains_trainid,gettrains_trainid],(error,result1)=>{
            if(error){
                return (error);
            }else{
                var jsonresponse = JSON.parse(JSON.stringify(result1));
                res.render(__dirname + '/views/checkavailability.ejs', {jsonresponse});
                console.log(jsonresponse);
                return (console.log(result1));
            }
        })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

userRouter.post("/bookticket", async (req,res,next)=>{
    try {
        const gettrains_class = Object.keys(req.body);
        console.log('Class Name:', gettrains_class);
        // console.log(usermail);
        // console.log(gettrains_trainid);
        // console.log(gettrains_date);
        rms.query("CALL book_ticket(?,?,?,?)",[usermail,gettrains_trainid,gettrains_class,gettrains_date], (error, result)=>{
           if(error){
               return (error);
           }else{
                res.send(output.ticket_booked);
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

userRouter.get("/viewbookings", async (req,res,next)=>{
    try {
        // const email = req.body.email;
        rms.query("SELECT * FROM bookings WHERE email = ?",[usermail], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
            var jsonresponse = JSON.parse(JSON.stringify(result));
            for(var i=0; i < jsonresponse.length; i++){
                var old_date = (jsonresponse[i].date_of_journey);
                var new_date = moment(old_date).format('YYYY-MM-DD');
                jsonresponse[i].date_of_journey = new_date;
               }
            res.render(__dirname + '/views/viewbookings.ejs', {jsonresponse});
            console.log(jsonresponse);
            // console.log(result);
            return (console.log(result[0]));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
// res.send("Helloo");
});

userRouter.post("/cancelbookings", async (req,res,next)=>{
    try {
        const ticket_no = req.body.ticket_no;
        rms.query("CALL insert_cancellation(?)",[ticket_no], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               rms.query("CALL cancel_table(?)",[ticket_no],(error,result2)=>{
                if(error){
                    return (error);
                }
                else{
                    return(console.log(result2));
                }
               })
               rms.query("SELECT cancellation_fee(?)",[ticket_no],(error,result1)=>{
                if(error){
                    return (error);
                }else{
                    const fee = Number(Object.values(result1[0]));
                    const ticket_cancelled = `<!DOCTYPE html>
<html>
<head>
	<title>Ticket Cancelled</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h1>Ticket Cancelled Successfully!</h1>
		<a href="userhome" class="nav-btn">Go Back To Home Page</a>
	</div>
    <script> alert("Your Ticket Is Cancelled With A Cancellation Fee Of Rs. ${fee}") </script>
</body>
</html>`;
                    res.send(ticket_cancelled);
                    return(console.log(result1));
                }
               })
               return (console.log(result));
           }
       })
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

userRouter.post("/userprofile", async (req,res,next)=>{
    try {
        // const email = req.body.email;
        const fname = req.body.first_name;
        const lname = req.body.last_name;
        const gender = req.body.gender;
        const dob = req.body.birthdate;
        const phone = req.body.phone;
        const aadhar = req.body.aadhar;
        // console.log(usermail);
        // console.log(fname);
        // console.log(lname);
        // console.log(gender);
        // console.log(dob);
        // console.log(phone);
        // console.log(aadhar);
        rms.query("UPDATE user_profile SET first_name = ?, last_name = ?, dob = ?, gender = ?, contact = ?, aadhar_ID = ? WHERE email = (SELECT email FROM user_login WHERE email = ?)",[fname,lname,dob,gender,phone,aadhar,usermail], (error, result)=>{
           if(error){
               return (error);
           }else{
               // console.log(result[0]);
               // res.send(result);
               return (console.log(result));
              
           }
           res.sendFile(__dirname + "/user.html")
       })

   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
   
});

module.exports = userRouter;