const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const router = require("express").Router();

router.route("/").post(createCategoryValidator, createCategory).get(getCategories);

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
