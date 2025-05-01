const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.createUserValidator = [
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
  check("phone")
    .optional()
    .isMobilePhone(["ar-YE", "ar-SA"])
    .withMessage("Invalid phone number"),
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
  check("profileImage").optional(),
  check("active")
    .isBoolean()
    .withMessage("Invalid value, the value must be true or false"),
  check("role").optional(),
  validatorMiddleware,
];

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid id"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid id"),
  body("name").custom((val, { req }) => {
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
  check("phone")
    .optional()
    .isMobilePhone(["ar-YE", "ar-SA"])
    .withMessage("Invalid phone number"),
  check("role").optional(),
  check("profileImage").optional(),
  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("You must enter current password"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("You must enter password confirmation"),
  check("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .isStrongPassword()
    .withMessage("Too week password")
    .custom(async (val, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid id"),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body("name").custom((val, { req }) => {
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
  check("phone")
    .optional()
    .isMobilePhone(["ar-YE", "ar-SA"])
    .withMessage("Invalid phone number"),
  check("role").optional(),
  check("profileImage").optional(),
  validatorMiddleware,
];