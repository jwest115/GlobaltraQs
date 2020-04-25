import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { userFirstUpvote, userUpovte } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
function Upvote(props) {
  const auth = useSelector((state) => state.auth);

  const { favoritedPin, upvoteid, user } = auth;
  const dispatch = useDispatch();
  const favoritedCheck = user.user_upvoted_stories.some(
    (a) => a.pinId === props.id
  );
  const a = true;
  return (
    <>
      <h2>
        {upvoteid} of {props.id} state user {favoritedPin ? "true" : "false"}
      </h2>
      <FavoriteButton
        onClick={() =>
          favoritedPin
            ? dispatch(userUpovte(upvoteid))
            : dispatch(userFirstUpvote(props.id, user.id))
        }
      >
        {favoritedPin ? `Favorited ${upvoteid} ${favoritedPin}` : "Favorite"}
      </FavoriteButton>
    </>
  );
}

export default Upvote;

const FavoriteButton = ({ children, onClick }) => {
  return (
    <button className="btn btn-primary default-btn-purple" onClick={onClick}>
      {children}
    </button>
  );
};
