const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");
const { v4: uuid4 } = require("uuid");
const sharp = require("sharp");

exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const fileName = `category-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${fileName}`);
  req.body.image = fileName;
  next();
});

// @desc     Create category
// @route     POST  /api/categories
// @access   Private
exports.createCategory = factory.createOne(Category);

// @desc     Get list of categories
// @route     GET  /api/categories
// @access   Public
exports.getCategories = factory.getAll(Category, "Category");

// @desc     Get specific category
// @route     GET /api/categories/:id
// @access   Public
exports.getCategory = factory.getOne(Category);

// @desc     Update specific category
// @route     PUT /api/categories/:id
// @access   Private
exports.updateCategory = factory.updateOne(Category);

// @desc     Delete specific category
// @route     DELETE /api/categories/:id
// @access   Private
exports.deleteCategory = factory.deleteOne(Category);
