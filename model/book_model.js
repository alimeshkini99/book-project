const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
  title: { type: String,lowercase: true, },
  isbn: { type: Number,unique:true},
  About:{type:String},
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'author',
    required:true
  }
},{
  timestamps:true
});

 

module.exports = mongoose.model('books',bookModel);
