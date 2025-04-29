const Product = require("../models/productModel");
const factory = require("./handlersFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");
const { v4: uuid4 } = require("uuid");
const sharp = require("sharp");

exports.uploadProductImages = uploadMixOfImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();
  if (req.files.imageCover) {
    const imageCoverFilesName = `product-${uuid4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFilesName}`);
    req.body.imageCover = imageCoverFilesName;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuid4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);
        req.body.images.push(imageName);
      })
    );
    next();
  }
});

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
