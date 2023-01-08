const jwt = require("jsonwebtoken")
const db = require("../database/connection.js")
const cookieParser = require("cookie-parser");

function auth(req, res, next) {
    const token = req.cookies.jwt;
  
    if (token) {  
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.redirect('login');
        }
  
        req.user = user;
        next();
      });

    } else {
      res.redirect('login');
    };

  }

  module.exports  = auth
