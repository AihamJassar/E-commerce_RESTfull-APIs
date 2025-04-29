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

const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/category/${doc.image}`;
    doc.image = imageUrl;
  }
};

categorySchema.post("init", (doc) => setImageURL(doc));

categorySchema.post("save", (doc) => setImageURL(doc));

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
