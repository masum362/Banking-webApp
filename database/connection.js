const mysql = require('mysql');


const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'msp',
})


con.connect((err)=>{
    if (err) throw err;
    else{
        console.log('Connection established');
    }
})
module.exports = con;