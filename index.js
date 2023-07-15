const express = require('express')
const author = require('./routes/author')
const book = require('./routes/book')
const app = express()
require('./startup/config.js')(app,express)
require('./startup/db.js')()
require('./startup/logging.js')()


app.use('/api/author',author)
app.use('/api/book',book)

const port = process.env.port || 3000;
app.listen(port,()=>console.log(`app listening on port ${port}`))