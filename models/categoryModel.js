const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category name must be unique"],
      minlength: [3, "Too short name category"],
      maxlenght: [32, "Too long name category"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
