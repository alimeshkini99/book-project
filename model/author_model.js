const mongoose = require("mongoose");

const authorModel = new mongoose.Schema({
  name: { type: String,lowercase: true, },
  birthDate: { type: Number},
  email:{type:String,unique:true,trim: true,lowercase:true}
},{
  timestamps:true
});

 

module.exports = mongoose.model('authors',authorModel);
