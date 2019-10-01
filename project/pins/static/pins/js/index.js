import React from 'react'
import ReactDOM from 'react-dom'

/**
 * @return {string}
 */

function DisplayPins(mymap) {
  var pin_list = window.props;
  // RECEIVES pin_list FROM PYTHON views.py MODULE
  for(var i in pin_list){
     var id = pin_list[i].pk;
     var title = pin_list[i].fields.title;
     var description = pin_list[i].fields.description;
     var latitude = pin_list[i].fields.latitude;
     var longitude = pin_list[i].fields.longitude;
     AddMapPoint(mymap, latitude, longitude, id);
  }
}

function AddMapPoint(mymap, lat, lng, id) {
 var vectorLayer = new ol.layer.Vector({
      source:new ol.source.Vector({
          features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
      })]
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        size : [700, 700],
        src: '../static/pins/blue_marker.png',
        scale: 0.075
        })
    })
 });
 mymap.addLayer(vectorLayer);
 return vectorLayer;
}

function CreateMap(latitude, longitude) {
  var mapDefaultZoom = 13;
  var mapLat = latitude;
  var mapLng = longitude;
  var mymap = new ol.Map({
  target: "world-map",
  layers: [
  new ol.layer.Tile({
      source: new ol.source.OSM({
          url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
      })
  })
  ],
  view: new ol.View({
  center: ol.proj.fromLonLat([mapLng, mapLat]),
  zoom: mapDefaultZoom
  })
  });
  DisplayPins(mymap);
  // mymap.on('click', addMarker);


  return (
      ""
  );
}

/**
 * @return {string}
 */
function GetLocation(props) {
  var latitude = props.latitude;
  var longitude = props.longitude;
  // GET USER'S CURRENT LOCATIO;N
    if(latitude && longitude && latitude != -1 && longitude != -1) {
        CreateMap(latitude, longitude);
    }
    else if (navigator.geolocation) {
        // GET CURRENT LOCATION OR GET REJECTED (GOES TO checkError FUNCTION)
        navigator.geolocation.getCurrentPosition(ShowPosition, CheckError);
    }
    else {
        // IF GEOLOCATION IS NOT SUPPORTED, DISPLAY CSULA
        CreateMap(34.0667742, -118.1706279);
        alert("Geolocation is not supported by this browser.");
    }
 return (
      ""
  );
}

/**
 * @return {string}
 */
function CheckError(error) {
  // IF USER DOES NOT ALLOW ACCESS TO CURRENT LOCATION, DISPLAY CSULA
    if(error.PERMISSION_DENIED) {
        CreateMap(34.0667742, -118.1706279);
    }
    else {
        CreateMap(34.0667742, -118.1706279);
    }
     return (
      ""
  );
}

/**
 * @return {string}
 */
function ShowPosition(position) {
  // GET LONGITUDE AND LATITUDE OF USER'S CURRENT LOCATION AND CREATE MAP
  var currentLatitude = position.coords.latitude;
  var currentLongitude = position.coords.longitude;
  CreateMap(currentLatitude, currentLongitude);
  return (
    ""
  );
}

const element = <GetLocation latitude={window.latitude} longitude={window.longitude}/>

ReactDOM.render(
  element,
  document.getElementById('world-map')
);