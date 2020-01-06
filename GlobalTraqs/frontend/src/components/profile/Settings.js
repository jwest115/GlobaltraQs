import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
import axios from 'axios';
import { logout} from "../../actions/auth";
import { login } from "../../actions/auth";
import {editUser} from "../../actions/users";

export class Settings extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
  };
   constructor(props) {
    super(props);
    this.state = {
        accountDeleted: false
    };
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(checked) {
    this.setState({ checked });
  }

  updateAccessibility = () => {
    const userId = this.props.auth.user.id;
    const accessibility_mode_active = this.props.auth.user.accessibility_mode_active ? false : true;
    const user = { accessibility_mode_active };
    this.props.editUser(userId, user);
  };


   deleteAccount = id => {
    this.props.logout();
    axios.delete(`api/auth/users/${id}/`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
    });
    this.setState({accountDeleted: true});
 };



  render() {

      console.log("checked " + this.state.checked);
      if(this.state.accountDeleted) {
          return <Redirect to='/' />
      }
       console.log(this.props.auth);


    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

     if (this.props.isAuthenticated) {
            // return <Redirect to="/" />;
        }

        const guestLinks = <div><Redirect to="/" /></div>;


    return (

      <div>

        <div>

          <br/>

            <span>Accessibility</span>
            <Switch className="react-switch" onChange={this.updateAccessibility} checked={user ? user.accessibility_mode_active : false} />

{/*
          <script type="text/javascript">
          var _userway_config = {
          account: 'BHN2wadYhB'
          };
          </script>
          <script type="text/javascript" src="https://cdn.userway.org/widget.js"></script>

*/}

        </div>

        <br/>

        <button  onClick={() => this.deleteAccount(userid)} type="button" className="btn btn-warning">Delete Account</button>
        {/*<Redirect to="/" />*/}

      </div>
    );
  }
}

Settings.propTypes = {
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
    { logout, login, editUser}
)(Settings);