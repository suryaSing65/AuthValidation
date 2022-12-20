
var db = require('../config/database');
const jwt = require('jsonwebtoken');
const tokenList=[] 
const  register  = 
    async (req, res) => {

        const { username, email, password, cpassword } = req.body;
        var sql = 'SELECT * FROM users WHERE useremail =?';
        db.query(sql, [email], function (err, data) {
            if (err) throw err
            if (data.length > 0) {
                res.status(400).json({ statuscode: 400, msg: `Email was already exist,Please Use Valid Email` });
            } else if (cpassword != password) {
                res.json({ statuscode: 400, msg: `Password & Confirm Password is not Matched` });
            } else {
                let sql = `INSERT INTO users (username, useremail, userpassword) VALUES (?, ?,?);`;
                db.query(sql, [username, email, password], function (err, data) {
                    // AccessToken...
                    const accessToken = jwt.sign({
                        username: data.username,
                        email: data.useremail
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '10m'
                    });

                    const refreshToken = jwt.sign({
                        username: data.username,
                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        sameSite: 'None', secure: true,
                        maxAge:  60 * 60 * 1000
                    });

                    var sql = 'SELECT id,username,useremail FROM users WHERE id=?';
                    db.query(sql, [data.insertId], (err, result) => {
                        res.status(201).json({
                            statuscode: 201,
                            msg: " Success ",
                            data: result
                        });
                    })

                    if (err) throw err;
                });
            }

        })

    };
const loginc = async (req, res) => {
        const { email, password } = req.body;
        
        var session;
        var sql = 'SELECT * FROM users WHERE useremail =? ';
        await db.query(sql, [email, password], (err, data)=> {
            
            if (err) throw err
            if (data.length > 0) {
                if (data[0].userpassword == password) {
                    session = req.session;
                    req.session.userId = data[0].id
                    // AccessToken...
                    const token = jwt.sign({
                        username: data.username,
                        email: data.useremail
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '5m'
                    });
                    // RefreshToken.....
                    const refreshToken = jwt.sign({
                        username: data.username,
                    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    const response = {
                        "status": "Logged in",
                        "token": token,
                        "refreshToken": refreshToken,
                    }
                    tokenList[refreshToken] = response
                    res.s
                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        sameSite: 'None', secure: true,
                        maxAge: 60 * 60 * 1000,

                    });
                    res.status(200).json({
                        success: true,
                        statuscode: 200,
                        username: data[0].useremail,
                        message: 'Login successful',
                        accessToken: token,
                        refreshToken: refreshToken
                    });
                } else {
                    res.status(400).json({ statuscode: 400,msg:"Email & Password is not Matched"});
                }

            } else {
                res.status(404).json({ statuscode: 404,msg:"Email Not Exist"});
            }
        })
    }
;
const logout  = 
   async (req, res) => {
         await req.session.destroy();
        res.status(200).json({ statuscode: 200, msg: `logout successfully` });
    };
    
    const loginget =async (req,res)=>{
        res.send("login")
    }

module.exports = {register, loginc,logout,loginget  }
