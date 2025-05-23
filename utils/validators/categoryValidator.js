const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short name category")
    .isLength({ max: 32 })
    .withMessage("Too long name category")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
