import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPins } from "../../../actions/pins";
import { makeStyles } from "@material-ui/core/styles";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  communityIcon,
  defaultPointerIcon,
  historicalIcon,
  personalIcon
} from "../Pins";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Story from "./Story";
const divStyle = {
  height: "40vh",
  width: "100%",
  left: "0"
};

const style = {
  signUpForm: {
    border: "2px solid #000000"
  }
};

const divStyle2 = {
  paddingLeft: "0px",
  paddingRight: "0px"
};

function MainStory() {
  let { path, url } = useRouteMatch();
  let { id } = useParams();
  console.log("the id is: " + id);
  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPins());
  }, [dispatch]);
  console.log(pins);
  const userpos = getUserLocation();
  const position = [userpos.lat, userpos.lng];

  return (
    <div className="container-fluid" style={divStyle2}>
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
                  <Link to={`${url}/${marker.id}`}> e </Link> View{" "}
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
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Story />
        </Route>
      </Switch>
    </div>
  );
}

export default MainStory;
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
