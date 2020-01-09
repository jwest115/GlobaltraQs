import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { Register } from "./register";
import { getUsers } from "../../actions/users";
import { Map } from "react-leaflet";

export class Manage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      if (user.is_administrator) {
        return (
          <div className="container">
            <table className="table table-bordered">
              <tbody>
                {this.props.users.map((user, index) => {
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
      } else {
        return <Redirect to="/" />;
      }
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users.users
});

export default connect(mapStateToProps, { getUsers })(Manage);
