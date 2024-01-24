const express = require("express");
const router = express.Router();
const {
  validateUserRegistration,
  handleValidationErrors,
} = require("../validation/validator");
const { registerUser } = require("../controller/signup");
const { verifyUser } = require("../controller/sendEmail");
const { loginUser } = require("../controller/login");
const { logout } = require("../controller/logout");





router.post(
  "/quizapp/user/signup",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);

router.get("quizapp/user/verify/:id/:token", verifyUser);

router.post("/quizapp/user/login", loginUser);
router.post("/quizapp/user/logout", logout)




module.exports = router;
