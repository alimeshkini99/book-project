const controller = require("./class/controller");
// const bookModel = require("../model/book_model");

module.exports = new (class extends controller {
  constructor() {
    super();
    this.getBooks = this.getBooks.bind(this);
    this.getBook = this.getBook.bind(this);
    this.createBook = this.createBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
  }
  async getBooks(req, res) {
    const bookList = await this.BookModel.find();
    console.log(bookList);
    this.response({data:bookList})
  }


  async getBook(req, res) {
    const { id } = req.params;
    const book = await this.BookModel.findOne({ isbn: id });
    if (!book) {return this.response({res,code:400,message:"book not found"})}
    this.response({res,data:book})
  } 

  async createBook(req, res) {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const author = req.body.author;  
    const bookExist = await this.BookModel.findOne({ isbn: isbn });
    if (bookExist) {return this.response({res,code:400,message:"book already exist"})}

    var data = await this.BookModel.create({ title, isbn, author });
    data.save();

    this.response({res,message:"book uploaded"})
  }

  async updateBook(req, res) {
    const { id } = req.params;
    const { title, author } = req.body;
    const bookExist = await this.BookModel.findOne({ isbn: id });
    if (!bookExist) {return this.response({res,code:400,message:"book do not exist"})}

    const updateField = (val, prev) => (!val ? prev : val);

    const updatedBook = {
      ...bookExist,
      title: updateField(title, bookExist.title),
      author: updateField(author, bookExist.author),
    };

    await this.BookModel.updateOne(
      { isbn: id },
      { $set: { title: updatedBook.title, author: updatedBook.author } }
    );
    this.response({res,message:"book updated"})
  }

  async deleteBook(req, res) {
    const { id } = req.params;

    const bookExist = await this.BookModel.findOne({ isbn: id });
    if (!bookExist) {return this.response({res,code:400,message:"book do not exist"})}

    await this.BookModel.deleteOne({ isbn: id })
      .then(function () {
        console.log("data deleted");
        this.response({res,message:"book record deleted successully"})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})();
