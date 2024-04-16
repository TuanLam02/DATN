
let map, directionsService, directionsRenderer;
var destinationLocation = {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lng)
};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 13.3340797, lng: 109.2256497 }
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    var greenMarker = {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // URL của biểu tượng màu xanh
        scaledSize: new google.maps.Size(40, 40) // Kích thước biểu tượng
    };
    
    fetch('db.php')
        .then(response => response.json())
        .then(locations => {
            locations.forEach(location => {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(location.lat), parseFloat(location.lng)),
                    map: map,
                    title: location.name,
                    icon: greenMarker
                });
                marker.addListener('click', function () {
                    displayTravelLocationInfomation(location);
                });
                console.log(location);
            });
        })
        .catch(error => console.error('Error:', error));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
    
                map.setCenter(pos);
                var marker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    title: "Vị trí của bạn"
                });
            }, function () {
                handleLocationError(true, map.getCenter());
            });
        } else {
            handleLocationError(false, map.getCenter());
        }
    
}



initMap();
function calculateAndDisplayRoute(location , travelMode) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            directionsService.route({
                origin: { lat: position.coords.latitude, lng: position.coords.longitude },
                destination: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                travelMode: travelMode,

            }, function (response, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                    var distance = calculateDistance(response.routes[0]);
                    // var duration = calculateDuration(response.routes[0]);
                    // displayDistanceAndDuration(distance, duration);
                    displayDistance(distance);
                } else {
                    window.alert('Yêu cầu chỉ đường thất bại do: ' + status);
                }
            });
        });
    }
}

function calculateDistance(route) {
    var distance = 0;
    for (var i = 0; i < route.legs.length; i++) {
        distance += route.legs[i].distance.value;
    }

    var distanceInKm = distance / 1000;
    return distanceInKm;
}
function displayDistance(distance) {
    var distanceDisplayOutsideMap = document.getElementById("distanceOutsideMap");
    distanceDisplayOutsideMap.textContent = "Khoảng cách: " + distance.toFixed(2) + " km";
}
//--------------------------------------------------------------------------------------
// function calculateDuration(route) {
//     var duration = 0;
//     for (var i = 0; i < route.legs.length; i++) {
//         duration += route.legs[i].duration.value;
//     }
//     // Chuyển đổi thời gian từ giây sang phút
//     var durationInMinutes = duration / 60;
//     return durationInMinutes;
// }

// function displayDistanceAndDuration(distance, duration) {
//     var distanceDisplay = document.getElementById("distance");
//     var durationDisplay = document.getElementById("duration");
//     distanceDisplay.textContent = "Khoảng cách: " + distance.toFixed(2) + " km";
//     durationDisplay.textContent = "Thời gian di chuyển: " + duration.toFixed(0) + " phút";
// }
function displayTravelLocationInfomation(location) {
    var infomation = document.getElementById("information");
    var img = document.getElementById("img");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var direct = document.getElementById("direct");
    var close = document.getElementById("close");
    // var selectedMode = document.getElementById("cars").value;
    infomation.style.display = "flex";
    img.src = "./asset/picture/" + location.picture;
    name.textContent = location.name;
    description.textContent = location.description;
    direct.addEventListener('click', function () {
        // if (selectedMode === "Car") {
        //     calculateAndDisplayRoute(location, google.maps.TravelMode.DRIVING);
        // } else {
        //     calculateAndDisplayRoute(location, google.maps.TravelMode.WALKING);
        // }
        calculateAndDisplayRoute(location, google.maps.TravelMode.WALKING);
        infomation.style.display = "none";
    });

    close.addEventListener('click', function () {
        infomation.style.display = "none";
    });
}

function handleLocationError(browserHasGeolocation, pos) {
    var infoWindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.'
    });
}
//-----------
var searchInput = document.getElementById('searchInput');
var dropdownContainer = document.querySelector('.dropdown');
var searchResultsDiv = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
    var searchQuery = this.value.trim();
    if (searchQuery !== '') {
        fetch('search.php?q=' + encodeURIComponent(searchQuery))
            .then(response => response.json())
            .then(results => {
                displaySearchResults(results);
            })
            .catch(error => console.error('Error:', error));
    } else {
        clearSearchResults();
    }
});

function displaySearchResults(results) {
    searchResultsDiv.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            var resultItem = document.createElement('div');
            resultItem.textContent = result.name; // assuming each result has a 'name' property
            resultItem.addEventListener('click', function() {
                // Handle click on search result item
                // For example, you may want to display information about the selected location
                searchInput.value = result.name;
                clearSearchResults();
            });
            searchResultsDiv.appendChild(resultItem);
        });
        dropdownContainer.style.display = 'block';
        searchResultsDiv.style.display = 'block';
    } else {
        clearSearchResults();
    }
}

function clearSearchResults() {
    searchResultsDiv.innerHTML = '';
    dropdownContainer.style.display = 'none';
    searchResultsDiv.style.display = 'none';
}
//----------