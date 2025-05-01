const User = require("../models/userModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");
const { v4: uuid4 } = require("uuid");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

exports.uploadProfileImage = uploadSingleImage("profileImage");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();
  const fileName = `user-${uuid4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/users/${fileName}`);
  req.body.profileImage = fileName;
  next();
});

/**
 * @description Create user
 * @rout        POST /api/users
 * @access      Private
 *
 * */
exports.createUser = factory.createOne(User);

/**
 * @description GET list of users
 * @rout        GET /api/users
 * @access      Private
 *
 * */
exports.getUsers = factory.getAll(User, "User");

/**
 * @description GET specific user by id
 * @rout        GET /api/users
 * @access      Private
 *
 * */
exports.getUser = factory.getOne(User);

/**
 * @description UPDATE specific user by id
 * @rout        PUT /api/users
 * @access      Private
 *
 * */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.body.profileImage,
      active: req.body.active,
      role: req.body.role,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

/**
 * @description DELETE specific user by id
 * @rout        DELETE /api/users
 * @access      Private
 *
 * */
exports.deleteUser = factory.deleteOne(User);

/**
 * @description GET logged user data
 * @rout        GET /api/users/getMe
 * @access      Private/Protected
 *
 * */
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

/**
 * @description UPDATE My password
 * @rout        DELETE /api/users/changeMyPassword
 * @access      Private/Protected
 *
 * */
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

/**
 * @description UPDATE Me
 * @rout        UPDATE /api/users/updateMe
 * @access      Private/Protected
 *
 * */
exports.updateLoggedUser = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({ data: updatedUser });
});

/**
 * @description DELETE Me
 * @rout        DELETE /api/users/delete me
 * @access      Private/Protected
 *
 * */
exports.deleteLoggedUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ status: "Succuss" });
});
