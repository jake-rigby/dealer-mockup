// Geo.js

// Calculate the distance between two geographic points in miles
function calculateDistance(location1, location2) {
    // Convert the locations to radians
    const lat1 = toRadians(location1.lat);
    const lng1 = toRadians(location1.lng);
    const lat2 = toRadians(location2.lat);
    const lng2 = toRadians(location2.lng);
  
    // Calculate the distance using the Haversine formula
    const earthRadius = 6371; // Kilometres
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(lat1) * Math.cos(lat2)
      * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
  
    return distance;
  }
  function checkDistance(distance) {
    const resultElement = document.getElementById("result"); if (distance < 50) {
      resultElement.innerHTML = "Yes";
    } else { resultElement.innerHTML = "No"; }
  }
  // Convert degrees to radians
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }