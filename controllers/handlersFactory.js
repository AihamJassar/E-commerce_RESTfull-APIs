const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    const countDocuments = await Model.countDocuments();
    let filterObject = {};
    if (req.filterObject) {
      filterObject = req.filterObject;
    }
    const apiFeatures = new ApiFeatures(Model.find(filterObject), req.query)
      .paginate(countDocuments)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();
    const { paginationResult, mongooseQuery } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: documents.length, paginationResult, data: documents });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(202).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete({ _id: id });
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).json({});
  });
