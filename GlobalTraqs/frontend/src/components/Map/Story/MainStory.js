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
import Testa from "./Testa";
import DisplayMap from "./DisplayMap";
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

  return (
    <div className="container-fluid" style={divStyle2}>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
          <Testa />
          <DisplayMap pins={pins} />
        </Route>
        <Route path={`${path}/:id`}>
          <DisplayMap pins={pins} />
          <Story />
          <Testa />
        </Route>
      </Switch>
    </div>
  );
}

export default MainStory;
