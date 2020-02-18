import React, { Component, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSelector, useDispatch, useStore } from "react-redux";

import { getUsers } from "../../actions/users";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className="container">
      <table className="table table-bordered">
        <tbody>
          {users.map((user, index) => {
            let userRole = "";
            if (user.is_administrator) {
              userRole = <strong>Administrator</strong>;
            } else if (user.is_moderator) {
              userRole = <strong>Moderator</strong>;
            }
            return (
              <tr>
                <td>{user.username}</td>
                <td>{userRole}</td>
                <td>
                  <button className="btn btn-success">Edit Role</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
