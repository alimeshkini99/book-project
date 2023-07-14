const express = require("express");
const { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");
const router = express.Router();
const Validator=require('./validator/validator')

router.get('/',getAuthors)
router.get('/:id',getAuthor)
router.post('/',Validator.authorValidtor(),Validator.validate,createAuthor)
router.put('/:email',updateAuthor)
router.delete('/:email',deleteAuthor)

module.exports=router
