const express = require('express');

var output={};

output.ticket_booked = `<!DOCTYPE html>
<html>
<head>
	<title>Ticket Booked</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h1>Ticket Booked Successfully!</h1>
		<a href="userhome" class="nav-btn">Go Back To Home Page</a>
	</div>
</body>
</html>`;


output.invalid_passwd = `<!DOCTYPE html>
<html>
<head>
	<title>Invalid Password</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h3>Invalid Password</h3>
		<a href="user" class="nav-btn">Try To Login Again</a>
	</div>
</body>
</html>`;

output.invalid_passwd2 = `<!DOCTYPE html>
<html>
<head>
	<title>Invalid Password</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h3>Invalid Password</h3>
		<a href="" class="nav-btn">Try To Login Again</a>
	</div>
</body>
</html>`;

output.fare_updated = `<!DOCTYPE html>
<html>
<head>
	<title>Fare Updated</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h1>Fare Is Updated!</h1>
		<a href="emphome" class="nav-btn">Go Back To Home Page</a>
	</div>
</body>
</html>`;

output.departure_updated = `<!DOCTYPE html>
<html>
<head>
	<title>Departure Updated</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h1>Departure Time Is Updated!</h1>
		<a href="emphome" class="nav-btn">Go Back To Home Page</a>
	</div>
</body>
</html>`;

output.arrival_updated = `<!DOCTYPE html>
<html>
<head>
	<title>Arrival Updated</title>
	<link rel="stylesheet" type="text/css" href="popup.css">
</head>
<body>
	<div class="container">
		<h1>Arrival Time Is Updated!</h1>
		<a href="emphome" class="nav-btn">Go Back To Home Page</a>
	</div>
</body>
</html>`;


module.exports = output;