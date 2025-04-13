const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short name category")
    .isLength({ max: 32 })
    .withMessage("Too long name category"),
  validatorMiddleware,
];

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Id format"),
  validatorMiddleware,
];
