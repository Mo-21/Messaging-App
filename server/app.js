if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config();
}
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const helmet = require("helmet");
require("./middlewares/passport-config")(passport);
const app = express();
http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const indexRouter = require("./routes/index");
const morgan = require("morgan");

const server = http.createServer(app);
app.use(express.static("dist"));
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected To Mongoose"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan("common"));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

server.listen(3000, () => {
  console.log("SERVER RUNNING");
});
module.exports = app;
