import React, { Component, useEffect, useState } from "react";

import { useSelector, useDispatch, useStore } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { getUsers } from "../../actions/users";

export default function ManageUsers() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;
  const users = useSelector(state => state.users.users);
  const [userRole, setuserRole] = useState({
    role: 2
  });
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    console.log(userRole);
  };
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
              <tr key={index}>
                <td>{user.username}</td>
                <td>{userRole}</td>
                <td>
                  <button className="btn btn-success">Edit Role</button>
                </td>
                <td>
                  <Button id="Popover1" type="button">
                    Launch Popover
                  </Button>
                  <Popover
                    placement="bottom"
                    isOpen={popoverOpen}
                    target="Popover1"
                    toggle={toggle}
                  >
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>
                      Sed posuere consectetur est at lobortis. Aenean eu leo
                      quam. Pellentesque ornare sem lacinia quam venenatis
                      vestibulum.
                    </PopoverBody>
                  </Popover>
                </td>
                <td>
                  <form onSubmit={onSubmit}>
                    <select
                      name="userRole"
                      value={userRole.role}
                      onChange={e => setuserRole({ role: e.target.value })}
                    >
                      <option value="1">Admin</option>
                      <option value="2">Moderator</option>
                      <option value="3">None</option>
                    </select>
                    <button>Edit the Role </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
