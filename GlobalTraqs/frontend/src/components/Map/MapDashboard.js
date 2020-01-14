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
  const [state, setstate] = useState(1335);
  const Convert = () => {
    useEffect(() => {
      setdivStyle({
        height: "40vh",
        width: "100%",
        left: "0"
      });
    }, []);
  };
  const addMarker = e => {
    if (e.button === 2) {
      console.log("right");
    } else {
      console.log("elft");
    }
    setplacement({
      userlat: e.latlng.lat,
      userlng: e.latlng.lng
    });
  };
  const Back = state => {
    setstate(1335);
    return state;
  };

  return (
    // <div id={"map-dashboard"}>
    <div>
      <Fragment>
        <center>
          {" "}
          <h2> {state}</h2>
        </center>
        <LeafletMap
          pins={pins}
          divStyle={divStyle}
          userposition={userposition}
          addMarker={addMarker}
          placement={placement}
        />
        <Switch>
          <Route exact path="/">
            <h3>Please select a topic. </h3>
            <ChangeBack
              state={state}
              Back={Back}
              divStyle={divStyle}
              pins={pins}
              userposition={userposition}
            />
          </Route>
          <Route path="/test">
            lit{" "}
            <Change
              state={state}
              convert={Convert}
              divStyle={divStyle1}
              pins={pins}
              userposition={userposition}
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

function Change(props) {
  props.convert();
  return null;
}
function ChangeBack(props) {
  props.Back(props.state);
  return null;
}
