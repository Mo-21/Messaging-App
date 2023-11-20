const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/users");

router.post("/", users_controller.sign_in);
router.post("/register", users_controller.sign_up);

module.exports = router;
