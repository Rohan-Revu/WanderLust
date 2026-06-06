const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://get.pxhere.com/photo/girl-girls-woman-model-person-photo-wallpaper-hair-plant-cloud-sky-dress-People-in-nature-nature-flash-photography-natural-landscape-happy-sunlight-grass-atmospheric-phenomenon-grassland-morning-sunset-horizon-landscape-rural-area-meadow-sunrise-dusk-long-hair-forest-wedding-dress-prairie-field-backlighting-gown-fun-evening-sitting-darkness-pasture-dawn-stock-photography-wildlife-romance-love-shadow-hill-portrait-photography-reflection-rock-child-wave-portrait-photo-shoot-ceremony-1643325.jpg",
      set: (value) =>
        value === ""
          ? "https://get.pxhere.com/photo/girl-girls-woman-model-person-photo-wallpaper-hair-plant-cloud-sky-dress-People-in-nature-nature-flash-photography-natural-landscape-happy-sunlight-grass-atmospheric-phenomenon-grassland-morning-sunset-horizon-landscape-rural-area-meadow-sunrise-dusk-long-hair-forest-wedding-dress-prairie-field-backlighting-gown-fun-evening-sitting-darkness-pasture-dawn-stock-photography-wildlife-romance-love-shadow-hill-portrait-photography-reflection-rock-child-wave-portrait-photo-shoot-ceremony-1643325.jpg"
          : value,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
