const axios = require("axios");
const Listing = require("../models/listing");

const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    mapToken: process.env.MAP_TOKEN,
  });
};

module.exports.createListing = async (req, res) => {
  let { title, description, image, price, location, country } = req.body;

  // Geocoding
  const MAP_TOKEN = process.env.MAP_TOKEN;

  const encodedLocation = encodeURIComponent(location);

  const maptilerUrl = `https://api.maptiler.com/geocoding/${encodedLocation}.json?limit=1&key=${MAP_TOKEN}`;

  const response = await axios.get(maptilerUrl);

  if (!response.data.features.length) {
    req.flash("error", "Location not found");
    return res.redirect("/listings/new");
  }

  const listing = new Listing({
    title,
    description,
    image: {
      url: image,
      filename: "listingimage",
    },
    price,
    location,
    country,

    // Save coordinates
    geometry: response.data.features[0].geometry,
  });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  listing.owner = req.user._id;

  await listing.save();

  req.flash("success", "Listing created successfully");

  res.redirect(`/listings/${listing._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  let { title, description, image, price, location, country } = req.body;
  const listing = await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image: { url: image, filename: "listingimage" },
    price,
    location,
    country,
  });
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  await listing.save();
  req.flash("success", "Listing updated successfully");
  res.redirect("/listings");
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};

module.exports.create = async (req, res, next) => {
  const MAP_TOKEN = process.env.MAP_TOKEN;
  const { path: url, filename } = req.file;

  const location = req.body.listing.location;
  const encodedLocation = encodeURIComponent(location);
  const maptilerUrl = `https://api.maptiler.com/geocoding/${encodedLocation}.json?limit=1&key=${MAP_TOKEN}`;

  const response = await axios.get(maptilerUrl);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.data.features[0].geometry;

  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};
