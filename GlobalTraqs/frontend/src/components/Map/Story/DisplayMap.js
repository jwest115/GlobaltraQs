import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  communityIcon,
  defaultPointerIcon,
  historicalIcon,
  personalIcon
} from "../Pins";
const divStyle = {
  height: "40vh",
  width: "100%",
  left: "0"
};
function DisplayMap({ pins }) {
  let { path, url } = useRouteMatch();
  const userpos = getUserLocation();
  const position = [userpos.lat, userpos.lng];
  return (
    <div>
      <Map center={position} zoom={15} maxZoom={30} id="map" style={divStyle}>
        <TileLayer
          attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
        />

        <MarkerClusterGroup>
          {pins.map((marker, index) => {
            let post = [marker.latitude, marker.longitude];
            let categoryIcon = "";
            if (marker.category == 1) {
              categoryIcon = personalIcon;
            } else if (marker.category == 2) {
              categoryIcon = communityIcon;
            } else {
              categoryIcon = historicalIcon;
            }
            const id = marker.id;

            return (
              <Marker key={index} position={post} icon={categoryIcon}>
                <Popup>
                  <strong>{marker.title}</strong> <br />{" "}
                  {marker.description.substring(0, 200)}
                  <br />
                  <br />
                  <Link to={`${marker.id}`}> e </Link> View{" "}
                  <button
                    onClick={() => this.updateStoryId(id)}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    View Story
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </Map>
    </div>
  );
}

export default DisplayMap;

function getUserLocation() {
  const [position, setPosition] = useState({
    lat: 34,
    lng: -118
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        succes => {
          console.log(succes.coords.latitude + "" + succes.coords.longitude);
          setPosition({
            lat: succes.coords.latitude,
            lng: succes.coords.longitude
          });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0
        }
      );
    }
  }, []);

  return position;
}
