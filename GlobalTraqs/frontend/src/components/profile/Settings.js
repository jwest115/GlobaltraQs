import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
import axios from "axios";
import { logout } from "../../actions/auth";
import { login } from "../../actions/auth";
import { editUser } from "../../actions/users";

export class Settings extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      accountDeleted: false,
      bio: "",
      userimage: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onImage = e =>
    this.setState({
      userimage: e.target.files[0]
    });
  handleChange(checked) {
    this.setState({ checked });
  }

  updateAccessibility = () => {
    const userId = this.props.auth.user.id;
    const accessibility_mode_active = this.props.auth.user
      .accessibility_mode_active
      ? false
      : true;
    const userData = { accessibility_mode_active };
    this.props.editUser(userId, userData);
  };

  deleteAccount = id => {
    this.props.logout();
    axios
      .delete(`api/auth/users/${id}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ accountDeleted: true });
  };
  uploadImage = e => {
    e.preventDefault();
    const userId = this.props.auth.user.id;
    let data = new FormData();
    data.append("image_url", this.state.userimage);
    axios
      .patch(`api/auth/users/${userId}/`, data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSubmit = e => {
    e.preventDefault(); //prevents refresh of page

    const userId = this.props.auth.user.id;
    const bio = this.state.bio;
    const userData = { bio };
    this.props.editUser(userId, userData);
  };

  componentDidMount() {
    const { isAuthenticated, user } = this.props.auth;
    if (user) {
      console.log("setting bio");
      this.setState({ bio: user.bio });
    }
  }

  render() {
    console.log("params are " + this.props.match.params.id);

    console.log("checked " + this.state.checked);
    if (this.state.accountDeleted) {
      return <Redirect to="/" />;
    }
    console.log(this.props.auth);

    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

    let userCanEdit = "";

    if (this.props.match.params.id == userid) {
      userCanEdit = (
        <div style={{ padding: "20px" }}>
          <div>
            <br />

            <span>Accessibility</span>
            <Switch
              className="react-switch"
              onChange={this.updateAccessibility}
              checked={user ? user.accessibility_mode_active : false}
            />
          </div>

          <br />

          <button
            onClick={() => this.deleteAccount(userid)}
            type="button"
            className="btn btn-warning"
          >
            Delete Account
          </button>
          {/*<Redirect to="/" />*/}

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <br />
              <label>Bio</label>
              <input
                className="form-control"
                type="text"
                name="bio"
                onChange={this.onChange}
                value={this.state.bio}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
    }

    const guestLinks = (
      <div>
        <Redirect to="/" />
      </div>
    );

    return (
      <>
        {userCanEdit}
        <form onSubmit={this.uploadImage}>
          <input
            type="file"
            id="image"
            name="userimage"
            accept="image/png, image/jpeg"
            onChange={this.onImage}
            required
          />
          <button>PUSH</button>
        </form>
        ;
      </>
    );
  }
}

Settings.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, login, editUser })(Settings);
