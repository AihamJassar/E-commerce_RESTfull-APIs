const router = require("express").Router();
const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword
} = require("../controllers/authController");

router.post("/signup", signupValidator, signup);

router.post("/login", loginValidator, login);

router.post("/forgotPassword", forgotPassword);

router.post("/verifyResetCode", verifyPassResetCode);

router.put("/resetPassword", resetPassword);

module.exports = router;
