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
  getLoggedUser,
  updateLoggedUserPassword,
  updateLoggedUser,
  deleteLoggedUser,
} = require("../controllers/userController");

const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");

router.use(protect);

router.get("/getMe", getLoggedUser, getUser);

router.put("/changeMyPassword", updateLoggedUserPassword);

router.put("/updateMe", updateLoggedUserValidator, updateLoggedUser);

router.delete("/deleteMe", deleteLoggedUser);

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
