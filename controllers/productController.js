const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc    Create product
// @route   Post /api/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Get list of products
// @route   Post /api/products
// @access  Public
exports.getProducts = factory.getAll(Product, "Product");

// @desc    Get specific product
// @route   Post /api/products
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Update specific product
// @route   Put /api/products
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   Put /api/products
// @access  Private
exports.deleteProduct = factory.deleteOne(Product);
