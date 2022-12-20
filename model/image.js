const mongoose =require("mongoose");
const Schema  = mongoose.Schema;
const imageschema = new Schema({
    userid : Schema.Types.ObjectId,
    name:{ 
        type:String,
        required: true
       },
    images:{
        type:Object,
        required:true
        },

});
const Images = mongoose.model("images",imageschema)
module.exports = Images; 