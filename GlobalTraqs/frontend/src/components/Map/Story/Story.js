import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPin } from "../../../actions/pins";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

function Story() {
  let { id } = useParams();
  const pin = useSelector(state => state.pins.pin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPin(id));
  }, [dispatch]);
  console.log(pin);
  return <div>{id}</div>;
}

export default Story;
