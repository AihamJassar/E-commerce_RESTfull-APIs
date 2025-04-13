const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc     Create category
// @rout     POST  /api/category
// @access   Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc     Get list of categories
// @rout     GET  /api/categories
// @access   Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, data: categories });
});

// @desc     Get specific category
// @rout     GET /api/category/:id
// @access   Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById({ _id: id });
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc     Update specific category
// @rout     PUT /api/category/:id
// @access   Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(202).json({ data: category });
});

// @desc     Delete specific category
// @rout     DELETE /api/category/:id
// @access   Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete({ _id: id });
  if (!category) {
    return next(new ApiError(`No category for this id ${id}`, 404));
  }
  res.status(204).json({});
});
