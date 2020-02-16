import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPins, deletePins } from "../../actions/pins";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
function ManageFlag() {
  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch(); // dispatches the action

  useEffect(() => {
    //similar to component did mount
    dispatch(getPins());
  }, []);
  console.log(pins);
  const adminDelete = id => {
    dispatch(deletePins(id));
  };
  const auth = useSelector(state => state.auth);

  const { isAuthenticated, user } = auth;

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      MANAGE THE FLAG
      <div className="container"></div>
      {pins && <ListFlags pins={pins} handleDelete={adminDelete} />}
    </div>
  );
}

export default ManageFlag;

function ListFlags({ pins, handleDelete }) {
  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          {pins.map((pin, index) => {
            return (
              <tr key={index}>
                <td>{pin.title}</td>
                <td>{pin.username ? pin.username : "Anon"}</td>
                {/* <td>{pin.flagscore}</td> */}
                <td>
                  <button
                    onClick={e => handleDelete(pin.id, e)}
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
