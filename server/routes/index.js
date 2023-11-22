const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const authorize_admin = require("../middlewares/authorizeAdmin");
const passport = require("passport");
require("../middlewares/passport-config")(passport);
const authenticate_refresh_token = require("../middlewares/authenticateRefreshToken");

const users_controller = require("../controllers/users");
const messages_controller = require("../controllers/messages");

//handling user's credentials
router.post("/login", users_controller.sign_in);
router.post("/register", users_controller.sign_up);
router.get("/logout", users_controller.log_out);

//handling user's actions
router.get(
  "/dashboard",
  [authorize, passport.authenticate("jwt", { session: false })],
  messages_controller.get_dashboard
);
router.get("/chat/:id", authorize, messages_controller.get_chat);
router.post("/chat/:id/send", authorize, messages_controller.post_chat);

router.get("/user_details", authorize, users_controller.get_user_details);
router.get(
  "/admin_details",
  [authorize, passport.authenticate("jwt", { session: false })],
  users_controller.get_user_details
);

module.exports = router;
