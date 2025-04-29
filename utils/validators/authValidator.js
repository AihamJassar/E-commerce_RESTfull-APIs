const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");
const slugify = require("slugify");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name required")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("E-mail required")
    .isEmail()
    .withMessage("Invalid e-mail")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error("E-mail already in use"));
      }
    }),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .withMessage("Too short password")
    .isStrongPassword()
    .withMessage("Too weak password")
    .custom((val, { req }) => {
      if (val !== req.body.passwordConformation) {
        throw new Error("Password conformation incorrect");
      }
      return true;
    }),
  check("passwordConformation")
    .notEmpty()
    .withMessage("Password conformation required"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("E-mail required")
    .isEmail()
    .withMessage("Invalid e-mail"),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 8 })
    .withMessage("Too short password"),
  validatorMiddleware,
];
