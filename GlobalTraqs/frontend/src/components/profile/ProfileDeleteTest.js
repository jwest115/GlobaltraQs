import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelfDelete } from "../../actions/auth";
export default function ProfileDeleteTest() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={() => dispatch(userSelfDelete())}>
          {" "}
          Delete Deez Nutz
        </button>
      ) : (
        "ur account is Deleted Loser"
      )}
    </div>
  );
}
