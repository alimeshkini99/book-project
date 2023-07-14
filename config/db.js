const mongoose = require('mongoose');

module.exports=function(){
  mongoose
  .connect('mongodb://127.0.0.1:27017/bookDB')
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));
}







// const mongoose = require('mongoose')

// var url ='mongodb://127.0.0.1:27017/booksDB'

// const connection = mongoose.connect(url).then(()=>{console.log('connected to mongodb');}).catch(()=>{console.log('could not connect to mongo');})

// module.exports= connection;