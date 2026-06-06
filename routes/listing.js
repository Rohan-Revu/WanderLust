const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

const ListingController = require("../controllers/listing.js");

router
  //index route
  .route("/")
  //show all route
  .get(wrapAsync(ListingController.index))
  //create route
  .post(
    validateListing,
    isLoggedIn,
    upload.single("image"),
    wrapAsync(ListingController.createListing),
  );
//new route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(ListingController.showListing))
  //update route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(ListingController.updateListing),
  )
  //delete route
  .delete(isLoggedIn, wrapAsync(ListingController.destroyListing));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm),
);

module.exports = router;
