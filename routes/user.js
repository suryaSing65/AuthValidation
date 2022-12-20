
const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const Auth = require("../middleware/auth")

const validation = require('../middleware/validation')
const { validate } = require('../middleware/validationMiddleware')
const{register,loginc,logout,loginget  }  = require('../controller/usercontroller');

//  session create ......
const oneDay = 1000 * 60 * 60;
router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
router.use(cookieParser());
router.use(express.json());

// User Register ....
router.post('/register', validate(validation.register),register );

// User Login...
router.post('/login', validate(validation.login),loginc);
router.get('/login', validate(validation.login),loginget );

// User Logout...
router.get('/logout', Auth.isLogin,logout  );


module.exports = router;