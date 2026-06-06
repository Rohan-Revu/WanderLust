const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const reviewController = require("../controllers/review.js");

//review post route
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview),
);

//review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
