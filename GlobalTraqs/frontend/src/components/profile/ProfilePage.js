import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { login } from "../../actions/auth";
import { getPins } from "../../actions/pins";
import axios from "axios";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Avatar } from 'antd';
import { getUser } from "../../actions/users";

export class ProfilePage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pins: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    //  getPins: PropTypes.func.isRequired
    //deletePins: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      stories: "",
      userStories: this.props.pins,
    };
  }

  updateProfileId = id => {
    this.props.getUser(id);
    };

  componentDidUpdate(prevProps) {
  if (this.props.match.params !== prevProps.match.params) {
        // call the fetch function again
      console.log("url changes" + this.props.match.params.id);
        this.updateProfileId(this.props.match.params.id);
      }
    }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(id);
    // const { userProfile } = this.props.user;
    // console.log(userProfile);

    // console.log(this.props.pins);
    console.log(this.state.userStories);
    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";
    this.setState({
      userStories: this.state.userStories.filter(b => b.owner == userid)
    });
    console.log(userid);

    /*   axios
      .get(`api/pins`)
      .then(response => {
        const profileStories = response.data.filter(b => b.owner == userid);
        console.log(profileStories);
        this.setState({
          stories: profileStories
        });
      })
      .catch(error => {
        console.log(error);
      }); */
  }

  render() {
    const { id } = this.props.match.params;
    console.log("user profile is: ");
    console.log(this.props.userProfile);
    console.log(this.state.userStories);

    const { isAuthenticated, login, user } = this.props.auth;

    const authLinks = (
        <Link
          to={`/users/${id}/settings`}
          params={{ testvalue: "hello" }}
        >
          <button type="button" className="btn btn-primary btn-sm">
            Settings
          </button>
        </Link>
    );

    let isOwner = false;

    if(user != null && user.id == id) {
        isOwner = true;
    }

    // const guestLinks = <div><Redirect to="/" /></div>;
    const guestLinks = <div></div>;

    return (
      <div>
          {this.props.userProfile ? (
         <div>
         <div>
          <Typography variant="h5" component="h3" align="center">
          <Avatar size={64} icon="user" />
            {this.props.userProfile ? ` ${this.props.userProfile.username}'s Profile Page` : ""}
              <p>
                <strong>Bio: </strong>
                Lorem ipsum dolor sit amet, justo a bibendum phasellus proodio
                ligula, sit
              </p>
          </Typography>
             {isOwner ? authLinks : guestLinks}
        </div>
        <div class="card">
           <div class="card-body">
                {this.state.userStories.map((marker, index) => {
                  return <h5 class="card-title" key={index}>Title: {marker.title} <br/>
                  Description: {marker.description.substring(0, 200)}</h5>; //key is needed for html stuff so it wont get mixed up
                })}

                {this.state.userStories.map((marker, index) => {
                  return <Link
                      to={`/Story/${marker.id}`}
                      params={{ testvalue: "hello" }}
                      key={index}
                    >
                      <button type="button" className="btn btn-primary btn-sm">
                        View Story
                      </button>
                    </Link>
                })}

           </div>
        </div>
      </div> ) : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins,
  userProfile: state.auth.userProfile
});

ProfilePage.propTypes = {};

export default connect(mapStateToProps, { login, getUser })(ProfilePage);
