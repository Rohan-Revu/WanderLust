const Listings = require("./models/listing");
const Review = require("./models/review");
const expressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in first");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listings.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "you don't have permission to edit this listing");
    return res.redirect("/listings");
  }
  next();
};

//error middleware for listing validation
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new expressError(400, error);
  }
  next();
};

//error middleware for review validation
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new expressError(400, error);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "you did not create this review");
    return res.redirect("/listings");
  }
  next();
};
