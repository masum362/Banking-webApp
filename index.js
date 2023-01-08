const express = require('express');
const con = require('./database/connection');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
dotenv.config({ path: './.env'});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use('/' , require('./routes/pages'))
app.use('/' , require('./routes/auth'))
app.set('view engine', 'hbs');

app.listen(3020,(err)=>{
    if(err) throw err;
    else{
        console.log('listening on port 3020');
    
    }
})
