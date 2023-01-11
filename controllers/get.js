const express = require('express');
const con = require('../database/connection');

// exports.account=(req,res)=>{
//     res.render('account')
// }
exports.contact=(req,res)=>{
    res.render('contact')
}
exports.dashboard=(req,res)=>{
    const user_id = req.cookies.user_id;
    const qry = `SELECT deposit AS deposit,withdraw AS withdraw,SUM(deposit) AS total_deposit , SUM(withdraw)
     AS total_withdraw , SUM(deposit)-SUM(withdraw) 
     AS total_amount FROM money where user_id =${user_id} `
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        // if(total_amount==0){
        //     res.send('please deposit the amount')
        // }
        else{
         return res.render('dashboard',{
            data: results
        })
    }

    })

    // res.render('dashboard')
}
exports.deposit=(req,res)=>{
    const user_id = req.cookies.user_id;
    const qry = `SELECT deposit,withdraw,SUM(deposit) AS total_deposit , 
                SUM(withdraw) AS total_withdraw , 
                SUM(deposit)-SUM(withdraw) AS total_amount FROM money where user_id =${user_id}`
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
            const last_deposit = req.cookies
         return res.render('deposit',{
            data: results,data2:last_deposit

        })
    }

    })
    
    // res.render('deposit')
}
exports.login=(req,res)=>{
    res.render('login')
}
exports.register=(req,res)=>{
    res.render('register')
}
exports.transection_history=(req,res)=>{
    const user_id = req.cookies.user_id;
    const qry = `SELECT deposit,withdraw FROM money where user_id = ${user_id} ORDER BY id DESC LIMIT 30  `
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
        //  return res.render('transection_history',{
        //     data: results
            res.render('transection_history',{
                data:results
            })
        // })
        // console.log(results[0].withdraw)
        // const deposit = 
    }

    })
    // res.render('transection_history')
}
exports.withdraw=(req,res)=>{
    const user_id = req.cookies.user_id;
    const qry = `SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) 
                AS total_withdraw , SUM(deposit)-SUM(withdraw)
                AS total_amount FROM money where user_id =${user_id}`
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
            const withdrawCookie = req.cookies;
            // console.log
         return res.render('withdraw',{
            data: results,data2: withdrawCookie

        })
    }

    })
    // res.render('withdraw')
}

// exports.withdraw_success=(req,res)=>{
//     const user_id = req.cookies.user_id;

//     res.render('withdraw_success')
//     // const qry = `SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) 
//     //             AS total_withdraw , SUM(deposit)-SUM(withdraw) 
//     //             AS total_amount FROM money where user_id=${user_id}`
//     // con.query(qry, (err, results) => {
//     //     if(err){
//     //       return console.log(err);
//     //     }
//     //     else{
//     //      return res.render('withdraw',{
//     //         data: results

//     //     })
//     // }

//     // })

//     // res.render('withdraw')
// }

exports.deposit_Amount=(req,res)=>{    
    const user_id = req.cookies.user_id;
    const qry =`SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) 
                AS total_withdraw , SUM(deposit)-SUM(withdraw) 
                AS total_amount FROM money where user_id = ${user_id} `
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('deposit',{
            data: results

        })
    }

    })
    // res.render('deposit')
}

exports.logout = (req,res) =>{
    res.cookie('jwt','',{maxAge:1});
    res.cookie('email','',{maxAge:1});
    res.cookie('last_withdraw','',{maxAge:1});
    res.cookie('last_deposit','',{maxAge:1});
    res.cookie('user_id','',{maxAge:1});

    // console.log('res cookie',res.cookie);
    res.redirect('login');
}

exports.home= (req,res)=>{
    res.render('login');
}