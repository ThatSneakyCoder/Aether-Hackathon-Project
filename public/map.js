let map;

function initMap(latitude, longitude) {
  // Initialize the map and set its view to the given latitude and longitude, and a zoom level
  map = L.map('map').setView([latitude, longitude], 13);

  // Add a tile layer (base map) to the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);

  // Add the geocoder control to the map
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false, // Disable the default marker for geocoded results
    collapsed: true, // Collapse the search bar by default
    position: 'topleft', // Position the search bar in the top-left corner of the map
  }).addTo(map);

  // Add an event listener for the geocoder's 'markgeocode' event
  geocoder.on('markgeocode', (event) => {
    // Center the map view on the geocoded location
    map.setView(event.geocode.center, 13);

    // Add a marker for the geocoded location
    L.marker(event.geocode.center).addTo(map).bindPopup(event.geocode.name).openPopup();
  });

  // Add a marker for the current location
  L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();
}

// Function to handle geolocation success
function onLocationSuccess(position) {
  initMap(position.coords.latitude, position.coords.longitude);
}

// Function to handle geolocation error
function onLocationError(error) {
  console.error('Error getting location:', error);
  // Fallback to a default location if geolocation fails (e.g., London)
  initMap(51.505, -0.09);
}

// Get the user's current location
navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
});



