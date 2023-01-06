// Index.js

// Get the device coordinates and do further actions in the callback
// nb - best practice is to only initiate this check on a user intention, like a click
navigator.geolocation.getCurrentPosition(
    
    // the success callback
    function (pos) {

        // format the current position for our code
        let position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        }

        // Harcode location for testing or comment out
        // position = {
        //     lat: 53.42485,
        //     lng: -2.2376907,
        // }

        // Display it
        const currentLocationElem = document.getElementById('current-location');
        currentLocationElem.innerHTML = `
            Your location is ${position.lat.toFixed(3)}, ${position.lng.toFixed(3)}
        `;

        // Get proximal locations at radius 2km to get all locations in this range
        // Might be better to include a range in each locaiton data so they can vary
        const proximalLocations = checkProximities(position, 2);

        // Early exit for no proximal locaions
        if (proximalLocations.length == 0) {
            const nothingMsgElem = document.getElementById('nothing-msg');
            nothingMsgElem.innerHTML = 'You aren\'t near anywhere with prices';

            // stop
            return;
        }

        // Display them
        const proximalLocationsElem = document.getElementById('proximal-locations');
        proximalLocationsElem.innerHTML = `
            You are within range of ${Object.keys(proximalLocations).map(key => proximalLocations[key].name).toString()}
        `;

        // Compile the prices into some html
        const prices = proximalLocations.map(location => `
            ${location.name}:
            <br>
            ${jsonToList(location.prices)}
            <hr>
        `);        

        // Display them
        const availablePricesElem = document.getElementById('available-prices');
        availablePricesElem.innerHTML = `
            <h2>Local Prices</h2>
            ${prices.join('<br>')}
        `;

    },

    // the error callback
    function (error) { 
        reject(error) 
    }
)

// checks the provided current location against the locations in `data`
function checkProximities(position, radius) {

    // Loop through each one and see if you're proximate
    const result = data.filter(location => {
        let distance = calculateDistance(location.position, position);
        return distance < radius;
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
