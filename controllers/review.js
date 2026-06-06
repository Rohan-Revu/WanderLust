const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const Newreview = new Review(req.body.review);
  Newreview.author = req.user._id;
  listing.reviews.push(Newreview);

  await Newreview.save();
  await listing.save();
  req.flash("success", "Review posted successfully");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const listing = await Listing.findById(id);

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted successfully");
  res.redirect(`/listings/${listing._id}`);
};
