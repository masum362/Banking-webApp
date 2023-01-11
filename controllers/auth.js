const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/connection');
const cookieParser = require('cookie-parser')
// const auth = require('../routes/secret-route');

const maxAge = 1000 * 60 * 24;
const CreateCoockie = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })

}


exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, confirmpassword } = req.body;
    db.query('SELECT id,email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (name === undefined || email === undefined || password === '' ||
            name === '' || email === '' || password === '') {
            return res.render('register', {
                massage: 'please fill the form correctly'
            })
        };
        if (results.length > 0) {
            return res.render('register', {
                massage: 'that email is already taken'
            })
        }

        else if (password !== confirmpassword) {
            return res.render('register', {
                massage: 'password does not match'
            })
        }

        const hashedpassword = await bcrypt.hash(password, 8);
        console.log({ hashedpassword });

        db.query('INSERT INTO users SET ?', {
            id: 123456 * Math.floor(Math.random() * 100 * Math.random() * 12)
            , name, email, password: hashedpassword
        }, (error, result) => {
            if (error) {
                console.log(error);
            }

            else {
                const token = CreateCoockie(result.email);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                console.log(token);

                // console.log(result)
                return res.render('login', {
                    msg: 'User Registration Successfully'
                })
            }
        })
    })
}


exports.login = (req, res,) => {
    const { email, password } = req.body

    if (req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.render('login', {
            massage: 'email or password must not be empty'
        })
    }

    db.query("SELECT * FROM users WHERE email=?", email, (err, result) => {

        if (err) {
            return res.render('login', {
                massage: err
            })
        }

        //check whether the user with that email exists or not
        if (result.length === 0) {
            return res.render('login', {
                massage: 'email is incorrect'
            })
        }

        //check password
        bcrypt.compare(password, result[0].password).then(isMatch => {

            if (isMatch === false) {
                return res.render('login', {
                    massage: 'password is incorrect'
                })
            }


            //generate token
            else {
                res.cookie('user_id', result[0].id, { httpOnly: true, maxAge: maxAge * 1000 })

                //    res.json(req.cookies)
                const token = CreateCoockie(result[0].id);
                // const loginEmail = (req.cookies.email)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                // console.log(loginEmail);
                return res.redirect('dashboard')

            }
        })
    })
}


exports.deposit = (req, res) => {
    const deposit = req.body.deposit;
    const user_id = req.cookies.user_id;
    const sql = `INSERT INTO money (deposit , user_id) VALUES(?,${user_id})`;


    db.query(sql, [deposit], (error, result) => {
        if (error) throw error;
        else {
            if (deposit == '' || deposit == undefined) {
                return res.render('problem', {
                    msgdeposit1: 'Insert a deposit Amount'
                })
            }
            else {
                res.cookie('last_deposit',deposit)
                // console.log()
                
                return res.render('success', {
                    msgdeposit2: 'Deposit Successfully',
                    data: result
                })
            }
        }
    })
}

exports.withdraw = (req, res) => {
    const withdraw = req.body.withdraw;
    // console.log()
    const user_id = req.cookies.user_id;
    const sql = `select sum(deposit)- sum(withdraw) as total_amount from money where user_id=${user_id}`
    // const sql = `INSERT INTO money (withdraw,user_id) VALUES (?,${user_id})`;
    // const sql2 = `SELECT SUM(deposit) -SUM(withdraw) AS total_amount FROM money`;

    db.query(sql, [withdraw], (error, result) => {
        if (error) throw error;
        else {
            const total_amount = result[0].total_amount;
            // console.log(total_amount)
            // console.log(withdraw)
            if(withdraw==='' || withdraw > total_amount){
                // console.log(error)
                return res.render('problem')
                
            }
            else{
                // console.log(withdraw)
                const sql1 = `INSERT INTO money (withdraw,user_id) VALUES (${withdraw},${user_id})`;
                db.query(sql1, (err, result) => {
                    if (err) {
                        // console.log(err)
                        return res.render('problem')
                    }
                    else{
                        
                        // console.log(withdrawCookie)
                        res.cookie('last_withdraw',withdraw)
                        // console.log(req.cookies.last_withdraw)
                        res.render('success',{
                            data:result
                        })
                    }
                })
            }
        }

    })

}



exports.contact = (req, res) => {
    const { name, email, subject, message } = req.body;
    const sql = 'INSERT INTO contact (name,email,subject,massage) VALUES(?,?,?,?)';
    db.query(sql, [name, email, subject, message], (error, results) => {

        if (error) throw error;
        else {
            if (name === undefined || name === '' ||
                email === undefined || email === '' ||
                subject === undefined || subject === '' ||
                message === undefined || message === '') {
                return res.render('contact', {
                    msgcontact1: 'please fill the form correctly'
                })
            }
            else {
                res.render('contact', {
                    msgcontact2: 'massage sent Successfully'
                })
            }
        }
    })
}


