const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({
      email,
      username,
    });
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.logIn = async (req, res) => {
  req.flash("success", "Login successful");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};
