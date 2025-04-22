const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

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
