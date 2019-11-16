import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import EditPin from "./EditPin";
import { getUser } from "../../actions/users";
import { GET_USER } from "../../actions/types";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import {
  communityIcon,
  defaultPointerIcon,
  historicalIcon,
  personalIcon
} from "./Pins";
import { getPins } from "../../actions/pins";
import L from "leaflet";
import default_marker from "./images/default.png";
import community from "./images/community.png";
import historical from "./images/historical.png";
import personal from "./images/personal.png";

const divStyle = {
  height: "40vh",
  width: "100%",
  left: "0"
};

const divStyle2 = {
  paddingLeft: "0px",
  paddingRight: "0px"
};

const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px"
};

export class Story extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getPins: PropTypes.func.isRequired,
    pins: PropTypes.array.isRequired,
    deletePins: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userStory: "",
      showEditForm: false,
      editButtonValue: "Edit Story",
      storyAuthor: "",
      storyId: ""
    };
  }

  state = {
    pinId: "",
    userStory: "",
    numberOfUpvote: "",
    upvote: "",
    hasVotedBefore: "",
    upVoteId: "",
    upVoterId: "",
    upVoter: "",
    flagged: "",
    flaggerId: "",
    hasFlaggedBefore: "",
    flagId: "",
    flagger: ""
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ pinId: id });
    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "";

    this.state.upVoterId = userid;
    this.setState({
      upVoterId: userid,
      upVoter: userid,
      flaggerId: userid,
      flagger: userid
    });
    this.state.upVoter = userid;
    console.log("the user id is: " + this.state.upVoterId);
    axios
      .get(`api/pins/${id}`)
      .then(response => {
        this.setState({ userStory: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`api/flagStory?pinId=${id}&flagger=${userid}`)
      .then(response => {
        const userFlaggedBefore =
          response.data && response.data.length ? true : false; // if user upvoted before
        const stateofFlagged = userFlaggedBefore
          ? response.data[0].upvote
          : false; //returns what the user had upvoted from before else new user is false
        const flaggedid = userFlaggedBefore ? response.data[0].id : false; //gets  id of upvotted story

        this.setState({
          flagged: stateofFlagged,
          hasFlaggedBefore: userFlaggedBefore,
          flagId: flaggedid
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`api/upVoteStory?pinId=${id}&upVoter=${userid}`)
      .then(response => {
        const userUpvotedBefore =
          response.data && response.data.length ? true : false; // if user upvoted before
        const stateofUpvote = userUpvotedBefore
          ? response.data[0].upvote
          : false; //returns what the user had upvoted from before else new user is false
        const upvoteid = userUpvotedBefore ? response.data[0].id : false; //gets  id of upvotted story

        this.setState({
          upvote: stateofUpvote,
          hasVotedBefore: userUpvotedBefore,
          upVoteId: upvoteid
        });
        console.log(
          "getting upvotes based on pin id + upvoter id " +
            "has userupvoted before: " +
            userUpvotedBefore +
            " what is the state of their upvote: " +
            stateofUpvote
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  onFlag = e => {
    e.preventDefault();
    this.state.flagged = true;
    console.log("flag these losers");
    const { flagged, pinId, flagger } = this.state;
    const upVoteStoryPin = { flagged, pinId, flagger };
    axios
      .post("/api/flagStory/", upVoteStoryPin)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    this.setState({
      flagged: true,
      hasFlaggedBefore: true
    });
  };
  changeUpvote(upVoteStoryPin) {
    console.log("the voite id is: " + this.state.upVoteId);
    axios
      .put(`/api/upVoteStory/${this.state.upVoteId}/`, upVoteStoryPin)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  newUpvote(upVoteStoryPin) {
    axios
      .post("/api/upVoteStory/", upVoteStoryPin)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    this.setState({
      hasVotedBefore: true
    });
  }
  onSubmit = e => {
    e.preventDefault();
    console.log(
      "initial upvote: " + this.state.upvote + " " + this.state.upVoter
    );
    const switchVote = this.state.upvote ? false : true;
    this.state.upvote ? (this.state.upVotes -= 1) : (this.state.upVotes += 1);
    this.setState({
      upvote: switchVote,
      upVotes: this.state.upVotes
    });
    console.log(this.state.upVotes);
    console.log("the updoot" + this.state.userStory.upVotes);
    this.state.upvote = switchVote;
    console.log(
      "post upvote: " + switchVote + " " + this.state.upvote + "lalal"
    );
    const { upvote, pinId, upVoter } = this.state;
    const upVoteStoryPin = { upvote, pinId, upVoter };
    this.state.hasVotedBefore
      ? this.changeUpvote(upVoteStoryPin)
      : this.newUpvote(upVoteStoryPin);

    console.log(this.state.upVotes + "how many");
    const { upVotes } = this.state;
    const storypin = { upVotes };
    axios
      .patch(`api/pins/${this.state.pinId}/`, storypin)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(
        `api/upVoteStory?pinId=${this.state.pinId}&upVoter=${this.state.upVoterId}`
      )
      .then(response => {
        const userUpvotedBefore =
          response.data && response.data.length ? true : false; // if user upvoted before
        const upvoteid = userUpvotedBefore ? response.data[0].id : false; //gets  id of upvotted story

        this.setState({
          upVoteId: upvoteid
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateStoryId = id => {
    axios
      .get(`api/pins/${id}`)
      .then(response => {
        this.setState({ userStory: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  editStory = () => {
    if (this.state.showEditForm) {
      this.setState({
        showEditForm: false,
        editButtonValue: "Edit Story"
      });
    } else {
      this.setState({
        showEditForm: true,
        editButtonValue: "Close"
      });
    }
  };

  getAuthor = user_id => {
    axios
      .get(`/api/auth/users/${user_id}/`)
      .then(res => {
        this.setState({ storyAuthor: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { id } = this.props.match.params;
    console.log(id);
    if (!this.state.userStory || this.state.userStory == undefined) {
      return null; //You can change here to put a customized loading spinner
    }
    let isAdminOrModerator = false;
    let adminModeratorEditStory = "";
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      if (
        user.is_administrator ||
        user.is_moderator ||
        this.state.userStory.user_id == this.state.storyAuthor.id
      ) {
        isAdminOrModerator = true;
        adminModeratorEditStory = (
          <div className="admin-moderator-edit">
            <button
              onClick={this.editStory}
              className="btn btn-success admin-moderator-edit"
            >
              {this.state.editButtonValue}
            </button>
          </div>
        );
      }
    }
    let authorName = "Anonymous";
    if (this.state.storyAuthor != "") {
      authorName = this.state.storyAuthor.username;
    }
    // console.log("lat " + this.state.userStory.latitude);
    const position = [
      this.state.userStory.latitude,
      this.state.userStory.longitude
    ];
    const flaggedButton = this.state.hasFlaggedBefore ? (
      <button type="button" class="btn btn-warning">
        Flagged
      </button>
    ) : (
      <form onSubmit={this.onFlag}>
        <button type="submit" className="btn btn-danger">
          Flag
        </button>
      </form>
    );
    const upVoteButton = (
      <button type="submit" className="btn btn-primary">
        {this.state.upvote ? "Downvote" : "Upvote"}
      </button>
    );
    // const {author} = this.props.user;
    return (
      <div className="container-fluid" style={divStyle2}>
        <form onSubmit={this.onSubmit}>
          <h2>
            number of upvotes {this.state.numberOfUpvote}{" "}
            {isAuthenticated ? upVoteButton : "login to upvote"}
          </h2>
        </form>

        <h2> {isAuthenticated ? flaggedButton : ""}</h2>
        <Map center={position} zoom={15} maxZoom={30} id="map" style={divStyle}>
          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />

          {this.props.pins.map((marker, index) => {
            let post = [marker.latitude, marker.longitude];
            let categoryIcon = "";
            if (marker.category == 1) {
              categoryIcon = personalIcon;
            } else if (marker.category == 2) {
              categoryIcon = communityIcon;
            } else {
              categoryIcon = historicalIcon;
            }
            const id = marker.id;

            return (
              <Marker key={index} position={post} icon={categoryIcon}>
                <Popup>
                  <strong>{marker.title}</strong> <br />{" "}
                  {marker.description.substring(0, 200)}
                  <br />
                  <br />
                  <button
                    onClick={() => this.updateStoryId(id)}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    View Story
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </Map>
        <div className="container-fluid" style={storyBody}>
          {this.state.showEditForm && (
            <EditPin
              title={this.state.userStory.title}
              description={this.state.userStory.description}
              userlat={this.state.userStory.latitude}
              userlng={this.state.userStory.longitude}
              storyid={id}
              user_id={this.state.userStory.user_id}
            />
          )}
          {isAdminOrModerator ? adminModeratorEditStory : ""}
          <h2>
            <strong>{this.state.userStory.title}</strong>
          </h2>
          <p>By: {authorName}</p>
          <hr></hr>
          <p>{this.state.userStory.description}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state
  // pin: state.pin.pin
});
export default connect(mapStateToProps, { getPins })(Story);
