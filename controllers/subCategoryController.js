const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc     Create subcategory
// @route     POST  /api/subcategories
// @access   Private
exports.createSubCategory = factory.createOne(SubCategory);

exports.createFilterObject = (req, res, next) => {
  req.filterObject = {};
  if (req.params.categoryId)
    req.filterObject = { category: req.params.categoryId };
  next();
};

// @desc     Get list of subcategories
// @route     GET  /api/subcategories
// @access   Public
exports.getSubCategories = factory.getAll(SubCategory, "SubCategory");

// @desc     Get specific subcategory
// @route     GET /api/subcategories/:id
// @access   Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc     Update specific subcategory
// @route     Put /api/subcategories/:id
// @access   Private
exports.updateSubCategory = factory.updateOne(SubCategory);

/**
 *  @desc     Delete specific subcategory
 *  @route    Delete /api/subcategories/:id
 *  @access   Private
 *
 * */
exports.deleteSubCategory = factory.deleteOne(SubCategory);
