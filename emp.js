const rmsdb = require("./connectdb");

let db = {};

db.login = (email,emp_id) =>{
    return new Promise((resolve, reject) => {
        rmsdb.query("SELECT * from emp_login WHERE emp_email = ? AND emp_id = ?",[email,emp_id], (error, result) =>{
            if(error){
                return reject(error);
            }
            return resolve(result);
        });
    });
}

module.exports = db;