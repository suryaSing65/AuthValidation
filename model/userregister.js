const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    _id: Schema.Types.ObjectId,
   
    username: {
        type: String
    },
  
    useremail: {
        type: String
    },
    userpassword: {
        type: String
    },
   
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, );
const User = mongoose.model('tocken', userSchema);
module.exports = User