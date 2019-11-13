import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Icon} from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';
import { login } from "../../actions/auth";


class ProfilePage extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {

          const { isAuthenticated, login, user } = this.props.auth;
          login: PropTypes.func.isRequired


    const authLinks = (




    <div>

    <Typography variant="h5" component="h3" align="center">
             {user ? `${user.username}'s Profile Page` : ""}
    </Typography>

    <a class="btn btn-primary" href="/#/settings" role="button">Setting</a>

    </div>


//    <p class="font-weight-bold">{user ? `Welcome ${user.username}` : ""}</p>




    );

    const guestLinks = (

         <div>

         not registered

        </div>

    );

    return (



        <div>

         {isAuthenticated ? authLinks : guestLinks}

        </div>
    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth
});

ProfilePage.propTypes = {
};

export default connect(
    mapStateToProps, {login })
    (ProfilePage);



