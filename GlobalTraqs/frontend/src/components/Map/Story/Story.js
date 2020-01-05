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
import Upvote from "./Upvote";
const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px"
};
function Story() {
  let { id } = useParams();
  const pin = useSelector(state => state.pins.pin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPin(id));
  }, [dispatch, id]);
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  //console.log(pin.flaggerstory);
  return (
    <div className="container-fluid" style={storyBody}>
      {" "}
      <h2>
        <strong>{pin.title}</strong>
      </h2>
      <p>
        {" "}
        {pin.startDate} - {pin.endDate}{" "}
      </p>
      {/* <p>By: {authorName}</p> */}
      <p>By: {pin.username}</p>
      <h6>
        {pin.updooots} upvotes
        {isAuthenticated ? (
          <Upvote pin={pin.updotes} userid={user.id} />
        ) : (
          <Link to="/login"> &nbsp;Login to upvote!</Link>
        )}
      </h6>
      <hr></hr>
      <p>{pin.description}</p>
    </div>
  );
}

export default Story;
