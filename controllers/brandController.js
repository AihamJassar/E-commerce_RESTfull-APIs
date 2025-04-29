const asyncHandler = require("express-async-handler");
const { v4: uuid4 } = require("uuid");
const sharp = require("sharp");
const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const fileName = `brand-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${fileName}`);

  req.body.image = fileName;
  next();
});

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
