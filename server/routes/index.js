const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const authorize_admin = require("../middlewares/authorizeAdmin");

const users_controller = require("../controllers/users");

router.post("/", users_controller.sign_in);
router.post("/register", users_controller.sign_up);

router.get("/user_details", authorize, users_controller.get_user_details);
router.get(
  "/admin_details",
  [authorize, authorize_admin],
  users_controller.get_user_details
);

module.exports = router;
