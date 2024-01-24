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
const { verifyToken } = require('../middleware/auth.js');





router.post(
  "/quizapp/user/signup",
  validateUserRegistration,
  handleValidationErrors,
  registerUser
);

router.get("/verify/:id/:token", verifyUser);

router.post("/quizapp/user/login", loginUser);
router.get("/quizapp/user/logout/:id", verifyToken, logout)




module.exports = router;
