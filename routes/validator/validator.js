const expressValidator = require('express-validator')
const  check = expressValidator.check;
const { validationResult } = require("express-validator");

module.exports = new(class{
  constructor(){
    this.validate=this.validate.bind(this)
    
  }
  authorValidtor(){
    return[
      check("email").isEmail().withMessage("email is invalid"),
      check("name").not().isEmpty().withMessage("name cant be empty"),
      check("birthDate").not().isEmpty().withMessage("birthDate cant be empty")
    ]
  }
  bookValidtor(){
    return[
      check("isbn").not().isEmpty().withMessage("isbn cant be empty"),
      check("title").not().isEmpty().withMessage("title cant be empty"),
      check("about").not().isEmpty().withMessage("about cant be empty"),
    ]
  }


  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const message = [];
      errors.forEach((err) => message.push(err.msg));
      res.status(400).json({
        message: "validation error",
        data: message,
      });
      return false;
    }
    return true;
  }

  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
})()