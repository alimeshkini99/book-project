const mongoose = require('mongoose');
const config = require('config')

module.exports=function(){
  mongoose
  .connect(config.get("db.address"))
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));
}

