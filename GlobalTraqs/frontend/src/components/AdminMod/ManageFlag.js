import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPins, deletePins } from "../../actions/pins";
import Manage1 from "./Manage1";
import { Alert } from "reactstrap";
function ManageFlag() {
  const pins = useSelector(state => state.pins.pins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPins());
  }, [dispatch]);
  console.log(pins);
  const adminDelete = id => {
    dispatch(deletePins(id));
  };
  return (
    <div>
      MANAGE THE FLAG
      <div className="container">manage these nuts</div>
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
                <td>{pin.flagscore}</td>
                <td>
                  <button
                    onClick={e => handleDelete(pin.id, e)}
                    className="btn btn-success"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
