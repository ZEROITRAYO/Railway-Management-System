const mysql = require("mysql");

var connectdb = mysql.createConnection({
    host: "your_host",
    user: "your_username",
    password: "your_password",
    database: "your_database"
  });

connectdb.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected");
  });

  module.exports = connectdb;