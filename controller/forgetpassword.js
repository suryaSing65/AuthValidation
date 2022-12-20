const express = require('express');
const forgetrouter = express.Router();
var db = require('../config/database');
const sendEmail = require("../middleware/sendemail");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const jwt_decode = require("jwt-decode")
const jwt = require('jsonwebtoken');
//  session create ......
const oneDay = 1000 * 60 * 60;
forgetrouter.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
forgetrouter.use(cookieParser());
forgetrouter.use(express.json());

const forgetpassword =  async (req, res) => {
    try {
      const { email } = req.body;
      var sql = 'SELECT * FROM users WHERE useremail =? ';
      await db.query(sql, [email], async (err, result) => {
        if (err)
          throw err;
        if (result.length == 0)
          return res.status(400).json({status:400,
            msg:"user with given email doesn't exist"});
        else {
          // Token...
          const userId = result[0].id
          const resetToken = jwt.sign({
            userId: result[0].id,
            resetTokenExpires : new Date(Date.now() + 60 * 1000),
             createdAt : new Date(Date.now()),
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
          });
          const link = `<a style="color:red" href="${process.env.BASE_URL}/tokencheck/${resetToken}" > Click me</a>`
          var text = `Password reset by click on ${link} `;
          await sendEmail(email, "reset password", `${text}`);
        }
        res.status(200).json({ status: 200, msg: "password reset link sent to your email account", data: text ,
        })
      });
    } catch (error) {
      res.status(404).json({status:404,msg:"An error occured"});
      
    }
  };
  const tokenco  = async (req, res, next) => {
    const token = req.params.token;

    if (token) {
      var decoded = await  jwt_decode(token);
     
      if(decoded.createdAt<=decoded.resetTokenExpires)
     {
      res.status(200).json({
        msg: "Verify Token", userid: token,
        
      })
     }else{
      return res.status(400).json({
        "error": true, 
        status: 400,
        message: 'Token Expire.'
      });
     } 
  
    } else {
      return res.status(403).json({
        "error": true, 
        status: 403,
        message: 'Token error'
      });
    }
  };
  const reset = (req, res, next) => {
    const userid = req.params.userid
    var decoded = jwt_decode(userid);
    const neid= decoded.userId
    var sql1 = 'SELECT * FROM users WHERE id =? ';
    db.query(sql1, [ neid], async(err, result) => {
      return email = result[0].useremail; 
    })
    const password = req.body.newpassword
    const sql = `UPDATE users SET userpassword = ? WHERE id=?`;
    db.query(sql, [password, neid], async(err, result) => {
      if (!err) {
        const text = `<a href= "${process.env.BASE_URL}/login">Login</a>`
  
        await sendEmail(email, "Reset Password Successfully", `${text}`);
        res.status(200).json({
          status: 200, 
          msg: "Reset Password successfully go to login and use new Password",
          link: `<a href= "${process.env.BASE_URL}/login">Login</a>`,
         
        }) 
      } else {
        res.status(400).json({ status: 400, msg: " user not found" })
      }
    })
}
module.exports = {forgetpassword ,tokenco,reset}

  
  
  