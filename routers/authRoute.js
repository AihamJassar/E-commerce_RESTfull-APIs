const router = require("express").Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const { signup, login } = require("../controllers/authController");

router.route("/signup").post(signupValidator, signup);

router.route("/login").post(loginValidator, login);

module.exports = router;
