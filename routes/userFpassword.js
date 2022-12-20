const express = require('express');
const forgetrouter = express.Router();
const {forgetpassword ,tokenco,reset} = require("../controller/forgetpassword")
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const validation = require('../middleware/validation')
const { validate } = require('../middleware/validationMiddleware')


//    Forget Password....
forgetrouter.post("/forgetpassword",forgetpassword);

// Tokencheck....  Get Token and Decode Token

forgetrouter.get('/tokencheck/:token', tokenco);
 
// Reset Password .....

forgetrouter.put('/resetpassword/:userid', validate(validation.confirmPassword),reset );
module.exports = forgetrouter;