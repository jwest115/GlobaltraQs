import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFlaggedPins,
  getNextFlaggedPins,
  deletePins
} from "../../actions/pins";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
function ManageFlag() {
  const flaggedPins = useSelector(state => state.pins.flaggedPins);
  const dispatch = useDispatch(); // dispatches the action

  useEffect(() => {
    //similar to component did mount
    dispatch(getFlaggedPins());
  }, []);

  const adminDelete = id => {
    dispatch(deletePins(id));
  };
  const auth = useSelector(state => state.auth);

  const { isAuthenticated, user } = auth;

  console.log(flaggedPins.results);
  return (
    <div>
      MANAGE THE FLAG
      <div className="container">
        <PrevNext next={flaggedPins.next} previous={flaggedPins.previous} />
        {flaggedPins.results && (
          <ListFlags pins={flaggedPins.results} handleDelete={adminDelete} />
        )}
      </div>
    </div>
  );
}

export default ManageFlag;

const PrevNext = props => {
  const dispatch = useDispatch();
  return (
    <>
      {props.previous ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.previous))}
          className="btn btn-outline-primary"
        >
          Previous{" "}
        </button>
      ) : (
        ""
      )}
      {props.next ? (
        <button
          onClick={() => dispatch(getNextFlaggedPins(props.next))}
          className="btn btn-outline-primary"
        >
          Next
        </button>
      ) : (
        ""
      )}
    </>
  );
};

function ListFlags(props) {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          {props.pins.map((pin, index) => {
            return (
              <tr key={index}>
                <td>{pin.title}</td>
                <td>{pin.username ? pin.username : "Anon"}</td>
                <td>{pin.flagscore} flags</td>
                <td>
                  <button
                    onClick={() => dispatch(deletePins(pin.id))}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>

                <td>
                  <Link to={`/Story/${pin.id}`}>View Story</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
