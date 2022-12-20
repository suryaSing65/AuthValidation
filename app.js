const dotenv = require('dotenv');
const express = require('express');
const userRegister = require("./routes/user");
const userForget = require("./routes/userFpassword");
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// User Router
app.use('/',userRegister);
app.use('/',userForget);



// PORT...

app.listen(process.env.PORT, () => {
    console.log(`Server active on http://localhost:${process.env.PORT}`);
})