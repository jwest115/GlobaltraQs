import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import EditPin from "./EditPin";
import { Link } from "react-router-dom";
import Pins, {
  communityIcon,
  defaultPointerIcon,
  historicalIcon,
  personalIcon
} from "./Pins";
import { getPins } from "../../actions/pins";
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
      category: "",
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
    const userid = user ? user.id : "";

    this.state.upVoterId = userid;
    this.setState({
      upVoterId: userid,
      upVoter: userid,

      flagger: userid
    });
    this.state.upVoter = userid;
    axios
      .get(`api/pins/${id}`)
      .then(response => {
        if(response.data.owner != null) {
          console.log("not null")
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
          category: response.data.category,
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

  onUpdate = (category, title, description, startDate, endDate, formattedStartDate, formattedEndDate) => {

    this.setState({
        category: category,
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        startDateFormatted: formattedStartDate,
        endDateFormatted: formattedEndDate,
        showEditForm: false,
        editButtonValue: "Edit Story", })
  };

  componentDidUpdate(prevProps) {
  if (this.props.match.params !== prevProps.match.params) {
        // call the fetch function again
      console.log("url changes" + this.props.match.params.id);
        this.updateStoryId(this.props.match.params.id);
      }
    }

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
            category: response.data.category,
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
        if (user.is_administrator || user.is_moderator || this.state.userStory.owner == user.id) {
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


    return (
      <div className="container-fluid" style={divStyle2}>
        <h2> {isAuthenticated ? flaggedButton : ""}</h2>
          <div style={{ height: '45%'}}>
            <Pins latitude={this.state.userStory.latitude} longitude={this.state.userStory.longitude}/>
          </div>

        <div className="container-fluid" style={storyBody}>
          {this.state.showEditForm && (
            <EditPin
              category={this.state.category}
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
              <div className="container-md jumbotron" key={index} style={style}>
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
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  pins: state.pins.pins // state.pins we want pins reducer from index, .pins is from initial state
  // pin: state.pin.pin
});
export default connect(mapStateToProps, { getPins })(Story);