
        // GET USER'S CURRENT LOCATION
        getLocation("{{ latitude }}", "{{ longitude }}");


        // FUNCTION TO CREATE THE MAP AND ADD PINS
        var mymap;
        function createMap(latitude, longitude) {
            mymap = L.map('world-map').setView([latitude, longitude], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoiandlc3Q2IiwiYSI6ImNrMDVyNHE1ZjBlbnczaXQzM2p4dTJiY2YifQ._6cSHSr3vaNAf1_HQIbocg'
            }).addTo(mymap);
            mymap.on('click', addMarker);
            displayPins("{{ pin_list | safe }}");
        }

        // PROMPT USER TO ENABLE CURRENT LOCATION
        function getLocation(latitude, longitude) {
            if(latitude && longitude) {
                createMap(latitude, longitude);
            }
            else if (navigator.geolocation) {
                // GET CURRENT LOCATION OR GET REJECTED (GOES TO checkError FUNCTION)
                navigator.geolocation.getCurrentPosition(showPosition, checkError);
            }
            else {
                // IF GEOLOCATION IS NOT SUPPORTED, DISPLAY CSULA
                createMap(34.0667742, -118.1706279);
                alert("Geolocation is not supported by this browser.");
            }
        }

        // IF USER DOES NOT ALLOW ACCESS TO CURRENT LOCATION, DISPLAY CSULA
        function checkError(error) {
            if(error.PERMISSION_DENIED) {
                createMap(34.0667742, -118.1706279);
            }
            else {
                createMap(34.0667742, -118.1706279);
            }
        }

        // GET LONGITUDE AND LATITUDE OF USER'S CURRENT LOCATION AND CREATE MAP
        function showPosition(position) {
            var currentLatitude = position.coords.latitude;
            var currentLongitude = position.coords.longitude;
            createMap(currentLatitude, currentLongitude);
        }

        // ADDS A PIN TO MAP ON MOUSE CLICK
        var newMarker;
        function addMarker(e){
                // Add marker to map at click location; add popup window
                if(newMarker != null) {
                    mymap.removeLayer(newMarker);
                }
                newMarker = new L.marker(e.latlng).addTo(mymap);
                document.getElementById('id_latitude').value = e.latlng.lat;
                document.getElementById('id_longitude').value = e.latlng.lng;
        }

        // RECEIVES pin_list FROM PYTHON views.py MODULE
        function displayPins(pin_list) {
            for(var i in pin_list){
               var id = pin_list[i].pk;
               var title = pin_list[i].fields.title;
               var description = pin_list[i].fields.description;
               var latitude = pin_list[i].fields.latitude;
               var longitude = pin_list[i].fields.longitude;
               // DISPLAY MARKER AT LATITUDE AND LONGITUDE WITH TITLE AND DESCRIPTION
               var marker = new L.marker([latitude, longitude]).addTo(mymap);
               marker.bindPopup("<b> <a style = 'text-decoration: none' href = '../" + id + "'>" + title + "</b> <br> " + description.substring(0, 150) + "</a>");
            }
        }