import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { userFirstUpvote, userUpovte } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
function Upvote(props) {
  console.log(props.pin);
  const dispatch = useDispatch();
  const upvoteid = props.pin.upvotedBefore
    ? props.pin.updotes.filter(a => a.upVoter === props.user.id)[0].id
    : 0;
  return (
    // fragment
    <>
      {props.pin.upvotedBefore ? (
        <button
          type="submit"
          onClick={() =>
            dispatch(userUpovte(upvoteid, props.pin.userCurrentUpvote))
          }
          className="btn btn-primary"
        >
          {props.pin.userCurrentUpvote ? "Downvote" : "Upvote"}
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => {
            dispatch(userFirstUpvote(props.pin.id, props.user.id));
          }}
        >
          Upvote
        </button>
      )}
    </>
  );
}

export default Upvote;
