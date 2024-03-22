const rmsdb = require("./connectdb");

let db = {};

db.newUser = (email,fname,lname,password,conf_password) => {
    return new Promise((resolve,reject) => {
        rmsdb.query("CALL register_new_user(?,?,?,?,?)",[email,fname,lname,password,conf_password], (error,result) => {
            if(error){
                return reject(error);
            }
            return resolve(console.log("New user registered!"));
        });
    });
};

// db.login = (username) => {
//     return new Promise((resolve,reject) => {
//         rmsdb.query("SELECT * FROM user_login WHERE username = ?",[username], (error,result) => {
//             if(error){
//                 return reject(error);
//             }else{
//                 return resolve(result);
//             }
//         });
//     });
// };

// db.getuserby_username = (username) =>{
//     return new Promise((resolve, reject) => {
//         rmsdb.query("SELECT * from user_login WHERE username = ?",[username], (error, result) =>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(result);
//         });
//     });
// }

db.login = (email) =>{
    return new Promise((resolve, reject) => {
        rmsdb.query("SELECT * from user_login WHERE email = ?",[email], (error, result) =>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}

module.exports = db;
