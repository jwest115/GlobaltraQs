import React, { Fragment, useState, useEffect } from "react";
import { getPins, getPin } from "../../actions/pins";
import { useDispatch, useSelector } from "react-redux";

import Pins from "./Pins";

import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import LeafletMap from "./LeafletMap";
import PinForm from "./PinForm";
import SearchSidebar from "../layout/SidebarTest";

const sidebarStyle = {
  position: "absolute",
  top: "0",
  height: "100%",
  zIndex: "1000",
  overflow: "hidden",
  right: "0px"
  // z-index: 1000;
  // position: absolute;
  // height: 100%;
  // overflow: hidden;
  // width: 100%;
  // top: 0;
};

export default function MapDashboard() {
  let { path, url } = useRouteMatch();
  const [divStyle, setdivStyle] = useState({
    height: "90%",
    width: "100%"
  });
  const [divStyle1, setdivStyle1] = useState({
    height: "40vh",
    width: "100%",
    left: "0"
  });

  const [placement, setplacement] = useState({
    userlat: 34.0522,
    userlng: -118.2437
  });
  const userposition = [34, -120];
  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPins());
  }, [dispatch]);

  const [modalState, setmodalstate] = useState(false);
  const [userForm, setuserForm] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: ""
  });
  const addMarker = e => {
    if (e.button === 2) {
      console.log("right");
    } else {
      console.log("elft");
    }
    console.log(e.latlng);
    setplacement({
      userlat: e.latlng.lat,
      userlng: e.latlng.lng
    });

    setmodalstate(!modalState);
  };
  const toggle = () => {
    setmodalstate(!modalState);
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(placement);
  };
  return (
    // <div id={"map-dashboard"}>
    <div>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <h3>Please select a topic. </h3>

            <LeafletMap
              pins={pins}
              divStyle={divStyle}
              userposition={userposition}
              addMarker={addMarker}
              placement={placement}
              modalState={modalState}
              toggle={toggle}
              handleSubmit={handleSubmit}
            />
          </Route>
          <Route path="/test">
            <LeafletMap
              pins={pins}
              divStyle={divStyle1}
              userposition={userposition}
              addMarker={addMarker}
              placement={placement}
            />
          </Route>
        </Switch>
        {/* <Pins /> */}

        {/* <div id={"sidebar-style"}> */}
        <div>
          {/* <SearchSidebar /> */}
          {/* <MapDisplay /> */}
        </div>
      </Fragment>
    </div>
  );
}
