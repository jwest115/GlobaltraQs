import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentStory from "./CommentStory";
import { getPin } from "../../../actions/pins";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Upvote from "./Upvote";
import Flag from "./Flag";
const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px"
};
function Story(props) {
  let { id } = useParams();
  const pin = useSelector(state => state.pins.pin);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { isAuthenticated, user } = auth;

  const [flagState, setflagState] = useState(false);
  useEffect(() => {
    dispatch(getPin(id));
  }, [id]);

  const upvoteButoon = <Link to="/login"> &nbsp;Login to upvote!</Link>;
  let test = isAuthenticated ? true : "yeet";
  console.log(test);
  //console.log(pin.flaggerstory);
  return (
    <div className="container-fluid" style={storyBody}>
      {" "}
      <h2>
        <strong>{props.pin.title}</strong>
      </h2>
      <p>
        {" "}
        {props.pin.startDate} - {props.pin.endDate}{" "}
      </p>
      {/* <p>By: {authorName}</p> */}
      <p>By: {props.pin.username}</p>
      <h6>
        {/* {props.pin.updooots} upvotes */}
        {isAuthenticated ? "" : props.pin.updooots && " upvotes"}
        {/* need to figure out a way to update upvotes maybe websockets  */}
        {isAuthenticated
          ? props.pin &&
            props.pin.updotes && (
              <Upvote pin={pin.updotes} userid={user.id} numOf={pin.updooots} />
            )
          : upvoteButoon}
        &nbsp;&nbsp;&nbsp;
        {isAuthenticated
          ? pin &&
            pin.flaggerstory && (
              <Flag userid={user.id} flag={pin.flaggerstory} />
            )
          : ""}
      </h6>
      <hr></hr>
      <p>{props.pin.description}</p>
      {props.pin && props.pin.commentstory && (
        <CommentStory
          comment={props.pin.commentstory}
          toggle={props.toggleComment}
          settoggleComment={props.settoggleComment}
        />
      )}
    </div>
  );
}

export default Story;
