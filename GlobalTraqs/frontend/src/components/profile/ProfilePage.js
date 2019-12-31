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

export class ProfilePage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pins: PropTypes.array.isRequired
    //  getPins: PropTypes.func.isRequired
    //deletePins: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      stories: "",
      userStories: this.props.pins
    };
  }

  componentDidMount() {
    // console.log(this.props.pins);
    console.log("from component did mount");
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
    console.log(this.state.userStories);
    const { isAuthenticated, login, user } = this.props.auth;

    const authLinks = (
      <div>
        <Typography variant="h5" component="h3" align="center">
        <Avatar size={64} icon="user" />
          {user ? ` ${user.username}'s Profile Page` : ""}
            <p>
              <strong>Bio: </strong>
              Lorem ipsum dolor sit amet, justo a bibendum phasellus proodio
              ligula, sit
            </p>
        </Typography>



        <a className="btn btn-primary" href="/#/settings" role="button">
          Setting
        </a>
      </div>
    );

    const guestLinks = <div><Redirect to="/" /></div>;

    return (
      <div>
        {isAuthenticated ? authLinks : guestLinks}
        <div class="card">
           <div class="card-body">
                {this.state.userStories.map((marker, index) => {
                  return <h5 class="card-title" key={index}>Title: {marker.title} <br/>
                  Description: {marker.description.substring(0, 200)}</h5>; //key is needed for html stuff so it wont get mixed up
                })}

                {this.state.userStories.map((marker, index) => {
                  return <Link
                      to={`Story/${marker.id}`}
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
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins
});

ProfilePage.propTypes = {};

export default connect(mapStateToProps, { login })(ProfilePage);
