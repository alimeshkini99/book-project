const AuthorModel = require("../../model/author_model");
const BookModel = require("../../model/book_model");
module.exports = class {
  constructor() {
    this.AuthorModel = AuthorModel;
    this.BookModel = BookModel;
  }
};
