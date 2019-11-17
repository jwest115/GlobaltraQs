import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import { login } from "../../actions/auth";

import axios from 'axios';


export class ProfilePage extends Component {
 constructor(props) {
    super(props);
    this.state = {
        stories: '',
    };
  }

     componentDidMount() {
     const { isAuthenticated, user } = this.props.auth;
     const userid = user ? user.id : "";
        axios.get(`api/pins`)
            .then(response => {
            const profileStories = response.data.filter(
          b => b.owner == userid
        )
                console.log(profileStories);
                this.setState({
                stories: profileStories
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

   render() {

             const { isAuthenticated, login, user } = this.props.auth;

             login: PropTypes.func.isRequired


    const authLinks = (




    <div>

    <Typography variant="h5" component="h3" align="center">
             {user ? `${user.username} Profile Page` : ""}
    </Typography>

    <a className="btn btn-primary" href="/#/settings" role="button">Setting</a>

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



         {this.state.stories.map((marker, index) => {

               return (
               <h2>
                {this.state.marker.title}
                 </h2>
                 )

            })}

         {isAuthenticated ? authLinks : guestLinks}

        </div>
       )
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