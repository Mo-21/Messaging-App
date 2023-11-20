const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (email, password, done) => {
    console.log("hello");
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log("!user");

        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        console.log("user.password !== password");
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log("!match");
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      }
      console.log("!success");
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("!user");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
