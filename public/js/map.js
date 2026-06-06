console.log("Map Token:", mapToken);
console.log("Listing:", listing);

if (!listing.geometry || !listing.geometry.coordinates) {
  console.error("No coordinates found!");
} else {
  maptilersdk.config.apiKey = mapToken;

  const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: listing.geometry.coordinates,
    zoom: 11,
  });

  new maptilersdk.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new maptilersdk.Popup().setHTML(`
        <div>
          <h5>${listing.title}</h5>
          <p><i>Exact location shown after booking</i></p>
        </div>
      `),
    )
    .addTo(map);
}
