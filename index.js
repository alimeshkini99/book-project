const express = require('express')
const bodyParser = require('body-parser')
const author = require('./routes/author')
const book = require('./routes/book')
const app = express()
require('./config/db')()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/author',author)
app.use('/api/book',book)

const port = process.env.port || 3000;
app.listen(port,()=>console.log(`app listening on port ${port}`))