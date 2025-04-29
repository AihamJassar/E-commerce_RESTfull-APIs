const router = require("express").Router();
const { protect, allowedTo } = require("../controllers/authController");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  resizeImage,
  changeUserPassword,
} = require("../controllers/userController");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

router.use(protect);
router.use(allowedTo("admin", "manager"));

router
  .route("/")
  .post(uploadProfileImage, resizeImage, createUserValidator, createUser)
  .get(getUsers);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadProfileImage, resizeImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

module.exports = router;
