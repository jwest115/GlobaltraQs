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
import MarkerClusterGroup from "react-leaflet-markercluster";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Modal from "./Modal";

const divStyle = {
  height: "40vh",
  width: "100%",
  left: "0"
};

const style = {
  signUpForm: {
    border: "2px solid #000000"
  }
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

const months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];



export class Story extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getPins: PropTypes.func.isRequired,
    pins: PropTypes.array.isRequired
    //deletePins: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userStory: "",
      showEditForm: false,
      editButtonValue: "Edit Story",
      storyAuthor: "",
      storyId: "",
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      startDateFormatted: "",
      endDateFormatted: "",
      userlat: 34.0668,
      userlng: -118.1684,
      modal: false,
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
    this.props.getPins();
    const { id } = this.props.match.params;
    this.setState({ pinId: id });
    const { isAuthenticated, user } = this.props.auth;
    const userid = user ? user.id : "no id";

    console.log("current user id is ");
    this.setState({
      upVoterId: userid,
      upVoter: userid,

      flagger: userid
    });

    axios
      .get(`api/pins/${id}`)
      .then(response => {
        if (response.data.owner != null) {
          console.log("not null");
          this.getAuthor(response.data.owner);
        }
        console.log(response.data);
        console.log("is the data");
        const flaggedData = response.data.flaggerstory.filter(
          b => b.flagger == userid
        )[0]; //gets the first value of the filter even tho its the only one
        const userFlaggedBefore = flaggedData ? true : false;
        console.log("has the user flag " + userFlaggedBefore);

        const upvotedData = response.data.updotes.filter(
          c => c.upVoter == userid
        )[0];

        const userUpvotedBefore = upvotedData ? true : false;
        const stateofUpvote = userUpvotedBefore ? upvotedData.upvote : false;
        const upvoteid = userUpvotedBefore ? upvotedData.id : false; //gets  id of upvotted story
        response.data.commentstory.map((marker, index) => {
          console.log(marker.username + " " + marker.description);
        });
        console.log(response.data.commentstory[0]);

      let startSplit = response.data.startDate.split('-');
      let start = new Date(startSplit[0], Number.parseInt(startSplit[1]) - 1, startSplit[2]);
      console.log("start " + startSplit[1] + "/" + startSplit[2] + "/" + startSplit[0]);
      console.log("start " + start);

      let selectedStartMonthName = months[start.getMonth()];
      let startDateFormatted = selectedStartMonthName + " " + start.getDate() + ", " + start.getFullYear();
      console.log("original " + start);
      let endSplit = response.data.endDate.split('-');
      let end = new Date(endSplit[0], Number.parseInt(endSplit[1]) - 1, endSplit[2]);
      console.log("end " + end);

      let selectedEndMonthName = months[end.getMonth()];
      let endDateFormatted = selectedEndMonthName + " " + end.getDate() + ", " + end.getFullYear();

        this.setState({
          userStory: response.data,
          title: response.data.title,
          description: response.data.description,
          startDate: start,
          startDateFormatted: startDateFormatted,
          endDate: end,
          endDateFormatted: endDateFormatted,
          upVotes: response.data.upVotes,
          hasFlaggedBefore: userFlaggedBefore,
          upvote: stateofUpvote,
          hasVotedBefore: userUpvotedBefore,
          upVoteId: upvoteid,
          updotes: response.data.updooots,
          showEditForm: false,
          editButtonValue: "Edit Story"
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onFlag = e => {
    e.preventDefault();
    this.state.flagged = true;
    console.log("flag these losers" + this.state.flagger);
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
        this.getData();
      })
      .catch(err => console.log(err));
  }

  newUpvote(upVoteStoryPin) {
    axios
      .post("/api/upVoteStory/", upVoteStoryPin)
      .then(res => {
        console.log("new");
        console.log(res.data);
        this.setState({
          upVoteId: res.data.id
        });
        this.getData();
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

    this.setState({
      upvote: switchVote
    });

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
  };
  getData() {
    axios
      .get(`api/pins/${this.state.pinId}`)
      .then(response => {
        console.log("number: " + response.data.updooots);
        this.setState({
          userStory: response.data,
          updotes: response.data.updooots
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  onUpdate = (title, description, startDate, endDate, formattedStartDate, formattedEndDate) => {

    this.setState({
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        startDateFormatted: formattedStartDate,
        endDateFormatted: formattedEndDate,
        showEditForm: false,
        editButtonValue: "Edit Story", })
  };

  updateStoryId = id => {
    axios
      .get(`api/pins/${id}`)
      .then(response => {
        let startSplit = response.data.startDate.split('-');
        let start = new Date(startSplit[0], Number.parseInt(startSplit[1]) - 1, startSplit[2]);
        console.log("start " + startSplit[1] + "/" + startSplit[2] + "/" + startSplit[0]);
        console.log("start " + start);

        let selectedStartMonthName = months[start.getMonth()];
        let startDateFormatted = selectedStartMonthName + " " + start.getDate() + ", " + start.getFullYear();
        console.log("original " + start);
        let endSplit = response.data.endDate.split('-');
        let end = new Date(endSplit[0], Number.parseInt(endSplit[1]) - 1, endSplit[2]);
        console.log("end " + end);

        let selectedEndMonthName = months[end.getMonth()];
        let endDateFormatted = selectedEndMonthName + " " + end.getDate() + ", " + end.getFullYear();
        this.setState({
            userStory: response.data,
            title: response.data.title,
            description: response.data.description,
            startDate: start,
            startDateFormatted: startDateFormatted,
            endDate: end,
            endDateFormatted: endDateFormatted,
            upVotes: response.data.upVotes,
            showEditForm: false,
            editButtonValue: "Edit Story",
        });
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

   addMarker = e => {
    this.setState({ userlat: e.latlng.lat });
    this.setState({ userlng: e.latlng.lng });
    this.createStory(false);
  };

   createStory = address => {
    const item = { title: "", description: "", address: "" };
    this.setState({ submitAddress: address, modal: !this.state.modal });
  };

   toggle = () => {
    this.setState({ modal: !this.state.modal });
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

    const userid = user ? user.id : "";

    if (isAuthenticated) {
      console.log("user is authenticated!");
      if (
        user.is_administrator ||
        user.is_moderator ||
        this.state.userStory.owner == user.id
      ) {
        isAdminOrModerator = true;
        console.log("user is admin or moderator! let them edit!");
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
        console.log("user IS admin or moderator!");
      }
    }
    let authorName = "Anonymous";
    if (this.state.userStory.owner != null) {
      authorName = this.state.userStory.username;
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
        {this.state.upvote ? <ThumbDownIcon></ThumbDownIcon> : <ThumbUpIcon></ThumbUpIcon>}
      </button>
    );

    // const {author} = this.props.user;
    // console.log("start date " + this.state.userStory.startDate);
    // let startDate = this.state.userStory.startDate.split('-');
    // let start = new Date(startDate[0], startDate[1], startDate[2]);
    // console.log("start " + startDate[1] + "/" + startDate[2] + "/" + startDate[0]);
    // console.log("start " + start);
    //
    // startDate = startDate[1] + "/" + startDate[2] + "/" + startDate[0];
    // let endDate = this.state.userStory.endDate.split('-');
    // let end = new Date(endDate[0], endDate[1], endDate[2]);
    // console.log("end " + end);
    // endDate = endDate[1] + "/" + endDate[2] + "/" + endDate[0];

    return (
      <div className="container-fluid" style={divStyle2}>
        <h2> {isAuthenticated ? flaggedButton : ""}</h2>
        <Map
             center={position}
             zoom={15}
             maxZoom={30}
             id="map"
             style={divStyle}
             onContextMenu={this.addMarker}
        >

          <TileLayer
            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
          />

            <MarkerClusterGroup>
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
                      <Link to={`${marker.id}`}> e </Link> View{" "}
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
          </MarkerClusterGroup>
        </Map>
        {this.state.modal ? (
          <Modal
            userlat={this.state.userlat}
            userlng={this.state.userlng}
            submitAddress={this.state.submitAddress}
            toggle={this.toggle}
            owner={userid}
          />
        ) : null }
        <div className="container-fluid" style={storyBody}>
          {this.state.showEditForm && (
            <EditPin
              title={this.state.title}
              description={this.state.description}
              userlat={this.state.userStory.latitude}
              userlng={this.state.userStory.longitude}
              storyid={id}
              userId={this.state.userStory.owner}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onUpdate = {this.onUpdate}
            />
          )}
          {isAdminOrModerator ? adminModeratorEditStory : ""}
          <h2>
            <strong>{this.state.title}</strong>
          </h2>
          <p> {this.state.startDateFormatted} - {this.state.endDateFormatted} </p>
          <p>By: {authorName}</p>
          <form onSubmit={this.onSubmit}>
          <h6>
            {this.state.userStory.updooots}{" "} upvotes
            {isAuthenticated ? upVoteButton : <Link to="/login"> Login to upvote!</Link>}
          </h6>
          </form>
          <hr></hr>
          <p>{this.state.description}</p>

            {this.state.userStory.commentstory.map((marker, index) => {
              console.log(marker.username);
              return (
                <div
                  className="container-md jumbotron"
                  key={index}
                  style={style}
                >
                  <p className="lead">
                    <img src="https://via.placeholder.com/30" />
                    {marker.username}
                  </p>

                  <p>{marker.description}</p>
                </div>
              );
            })}
          </div>
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
