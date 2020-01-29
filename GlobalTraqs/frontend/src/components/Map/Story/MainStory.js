import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPins, getPin } from "../../../actions/pins";

import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import Story from "./Story";

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

  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPins());
  }, [dispatch]);

  return (
    <div className="container-fluid" style={divStyle2}>
      <DisplayMap pins={pins} />
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
