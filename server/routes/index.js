const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const authorize_admin = require("../middlewares/authorizeAdmin");
const passport = require("passport");
require("../middlewares/passport-config")(passport);
const authenticate_refresh_token = require("../middlewares/authenticateRefreshToken");

const users_controller = require("../controllers/users");

router.post("/", users_controller.sign_in);
router.post("/register", users_controller.sign_up);
router.post("/logout", users_controller.log_out);

router.get("/user_details", authorize, users_controller.get_user_details);
router.get(
  "/admin_details",
  [authorize, passport.authenticate("jwt", { session: false })],
  users_controller.get_user_details
);

router.get(
  "/dashboard",
  [authorize, authenticate_refresh_token],
  users_controller.dashboard
);

module.exports = router;
