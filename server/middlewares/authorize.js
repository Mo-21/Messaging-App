const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authorize = asyncHandler(async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Forbidden");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = authorize;
