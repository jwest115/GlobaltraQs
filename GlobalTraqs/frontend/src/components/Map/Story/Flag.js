import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userFlagPin } from "../../../actions/pins";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
function Flag(props) {
  const dispatch = useDispatch();
  console.log(props.pin);

  return (
    <>
      {props.pin.flagState ? (
        <button type="submit" className="btn btn-danger disabled">
          Flagged
        </button>
      ) : (
        <button
          onClick={e => {
            dispatch(
              userFlagPin(props.pin.id, props.user.id, props.pin.flagstate)
            );
          }}
          type="submit"
          className="btn btn-warning"
        >
          Flag
        </button>
      )}
    </>
  );
}

export default Flag;
