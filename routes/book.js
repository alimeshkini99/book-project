const express = require("express");
const router = express.Router();
const {deleteBook,getBooks,getBook,createBook,updateBook}=require('./../controller/bookController')
const Validator=require('./validator/validator')


router.get('/',getBooks)
router.get('/:id',getBook)
router.post('/',Validator.bookValidtor(),Validator.validate,createBook)
router.put('/:id',updateBook)
router.delete('/:id',deleteBook)

module.exports=router
