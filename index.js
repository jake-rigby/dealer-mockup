
// Get the device coordinates and do further actions in the callback
navigator.geolocation.getCurrentPosition(
    
    // the success callback
    function (pos) {

        // display it
        let currentLocationElem = document.getElementById('current-location');
        currentLocationElem.innerHTML = `Your location is ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`;

        // translate the format for the proximity check function and call it at radius 2km to get all locations in this range
        const proximalLocations = checkProximities({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        }, 2);

        // Show a list of proximal locations
        let proximalLocationsElem = document.getElementById('proximal-locations');
        proximalLocationsElem.innerHTML = `You are within range of ${Object.keys(proximalLocations).map(key => proximalLocations[key].name).toString()}`;

        // Display a price list for each in-range location
        let prices = "";
        Object.keys(proximalLocations).forEach(key => {
            let loc = proximalLocations[key];
            prices += `${loc.name}: \n ${jsonToList(loc.prices)}\n`
        })
        
        let availablePricesElem = document.getElementById('available-prices');
        availablePricesElem.innerHTML = prices;

    },

    // the error callback
    function (error) { 
        reject(error) 
    }
)

// checks the provided current location against the locations in `data`
function checkProximities(currentLocation, radius) {

    const result = [];

    // You can get a list of locations to loop over like this
    const locations = Object.keys(data);

    // Loop through each one and see if you're proximate
    locations.forEach(key => {
        let distance = calculateDistance(data[key].location, currentLocation);
        if (distance < radius) {
            // add to the result (using a clone instead of the original object)
            result[key] = Object.assign({}, data[key]);
        }
    });

    return result;
}

// function that turns a JSON string object into something well formatted for humans
function jsonToList(json) {
    let list = '';

    function parse(json, indent) {
        for (let key in json) {
            list += `${' '.repeat(indent * 2)}${key}: `;
            if (typeof json[key] === 'object') {
                list += '\n';
                parse(json[key], indent + 1);
            } else {
                list += `${json[key]}\n`;
            }
        }
    }

    parse(json, 0);
    return list;
}
