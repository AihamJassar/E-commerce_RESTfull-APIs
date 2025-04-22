const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @desc Create brand
// @route Post /api/brands/
// @access Private
exports.createBrand = factory.createOne(Brand);

// @desc Get list of brands
// @route Get /api/brands
// @access Public
exports.getBrands = factory.getAll(Brand, "Brand");

// @desc Get specific brand
// @route Get /api/brands
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc Update specific brand
// @route Put /api/brands
// @access Private
exports.updateBrand = factory.updateOne(Brand);

// @desc Delete specific brand
// @route Delete /api/brands
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);
