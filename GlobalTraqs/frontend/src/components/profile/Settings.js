import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Switch from "react-switch";
import axios from 'axios';
import { logout} from "../../actions/auth";
import { login } from "../../actions/auth";

export class Settings extends Component {



  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
   constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

 deleteAccount = id => {
this.props.logout
 axios.delete(`api/auth/users/${id}/`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

 }



  render() {


    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

     if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const guestLinks = <div><Redirect to="/" /></div>;


    return (

      <div>

        <div>

          <br/>

            <span>Accessibility</span>
            <Switch className="react-switch" onChange={this.handleChange} checked={this.state.checked} />

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
        <Redirect to="/" />

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
    { logout, login}
)(Settings);