const controller = require("./class/controller");
// const authorModel = require("../model/author_model");

module.exports = new (class extends controller {
  constructor() {
    super();
    this.getAuthor = this.getAuthor.bind(this);
    this.getAuthors = this.getAuthors.bind(this);
    this.createAuthor = this.createAuthor.bind(this);
    this.updateAuthor = this.updateAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }
  async getAuthors(req, res) {
    const authorList = await this.AuthorModel.find();
    console.log(authorList);
    res.send(authorList);
  }

  async getAuthor(req, res) {
    const { id } = req.params;
    const author = await this.AuthorModel.find({ _id: id });
    if (!author) return res.send("author not found");
    res.send(author);
  }

  async createAuthor(req, res) {
    const name = req.body.name;
    const birthDate = req.body.birthDate;
    const email = req.body.email;
    // console.log(emailAddress);
    const authorExist = await this.AuthorModel.findOne({ email: email });
    if (authorExist) return res.send("author exsit");

    let data = await this.AuthorModel.create({ name, birthDate, email});
    data.save();

    res.send("author Uploaded");
  }

  async updateAuthor(req, res) {
    const { email } = req.params;
    const { name, birthDate } = req.body;
    const authorExist = await this.AuthorModel.findOne({ email: email });
    if (!authorExist) return res.send("author do not exist");

    const updateField = (val, prev) => (!val ? prev : val);

    const updatedAuthor = {
      ...authorExist,
      name: updateField(name, authorExist.name),
      birthDate: updateField(birthDate, author.birthDate),
    };

    await this.AuthorModel.updateOne(
      { email: email },
      { $set: { name: updatedAuthor.name, birthDate: updatedAuthor.birthDate } }
    );
    res.status(200).send("Author updated");
  }

  async deleteAuthor(req, res) {
    const { email } = req.params;

    const authorExist = await this.AuthorModel.findOne({ email: email });
    if (!authorExist) return res.send("author do not exist");

    await this.AuthorModel.deleteOne({ email: email })
      .then(function () {
        console.log("data deleted");
        res.send("author record deleted successully");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})();
