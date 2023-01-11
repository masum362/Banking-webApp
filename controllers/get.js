const express = require('express');
const con = require('../database/connection');

exports.account=(req,res)=>{
    res.render('account')
}
exports.contact=(req,res)=>{
    res.render('contact')
}
exports.dashboard=(req,res)=>{

    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('dashboard',{
            data: results

        })
    }

    })

    // res.render('dashboard')
}
exports.deposit=(req,res)=>{

    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
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
exports.login=(req,res)=>{
    res.render('login')
}
exports.register=(req,res)=>{
    res.render('register')
}
exports.transection_history=(req,res)=>{
    const qry = 'SELECT id,deposit,withdraw FROM money'
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('transection_history',{
            data: results

        })
    }

    })
    // res.render('transection_history')
}
exports.withdraw=(req,res)=>{
    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('withdraw',{
            data: results

        })
    }

    })
    // res.render('withdraw')
}

exports.withdraw_amount=(req,res)=>{

    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    con.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('withdraw',{
            data: results

        })
    }

    })

    // res.render('withdraw')
}

exports.deposit_Amount=(req,res)=>{

    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
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
    console.log('res cookie',res.cookie);
    res.redirect('login');
}

