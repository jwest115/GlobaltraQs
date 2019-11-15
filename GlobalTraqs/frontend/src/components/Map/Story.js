import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { connect } from "react-redux";

export class Story extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  state = {
    pinId: "",
    userStory: "",
    upVotes: "",
    upvote: "",
    hasVotedBefore: "",
    upVoteId: "",
    upVoterId: "",
    upVoter: "",
    flagged: "",
    hasFlaggedBefore: "",
    flagId: "",
    flagger: "",
    currentUser: "",
    test: "",
    updotes: ""
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

      flagger: userid
    });
    this.state.upVoter = userid;
    console.log("the user id is: " + id);
    axios
      .get(`api/pins/${id}`)
      .then(response => {
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

        console.log(upvotedData);
        this.setState({
          userStory: response.data,
          upVotes: response.data.upVotes,
          hasFlaggedBefore: userFlaggedBefore,
          upvote: stateofUpvote,
          hasVotedBefore: userUpvotedBefore,
          upVoteId: upvoteid,
          updotes: response.data.updooots
        });
      })
      .catch(error => {
        console.log(error);
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

  render() {
    const { id } = this.props.match.params;
    console.log(this.state.hasFlaggedBefore);
    const { isAuthenticated, user } = this.props.auth;
    const flaggedButton = this.state.hasFlaggedBefore ? (
      <button type="button" className="btn btn-warning">
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
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>id is {this.state.pinId} </h2>
        <h2>Title: {this.state.userStory.title}</h2>
        <h2>Description: {this.state.userStory.description}</h2>
        <h2>latitude: {this.state.userStory.latitude}</h2>
        <h2>longitude: {this.state.userStory.longitude}</h2>
        <h2>
          owner: {this.state.userStory.owner} {this.state.username}
        </h2>
        <h2></h2>

        <div className="col-lg-1">
          <img
            src="https://picsum.photos/200/300"
            className="rounded"
            position="center"
          ></img>
        </div>
        <form onSubmit={this.onSubmit}>
          <h2>
            number of upvotes: {/* this.state.userStory.updooots */}{" "}
            {this.state.updotes}{" "}
            {isAuthenticated ? upVoteButton : "login to upvote"}
          </h2>
        </form>

        <h2> {isAuthenticated ? flaggedButton : ""}</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum.{" "}
          <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>.
          Praesent mauris. Fusce nec tellus sed augue semper porta.{" "}
          <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Mauris
          massa. Vestibulum lacinia arcu eget nulla.{" "}
          <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit</b>. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.{" "}
        </p>

        <p>
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
          Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem
          at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut
          ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel,
          suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia
          aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt
          sed, euismod in, nibh. Quisque volutpat condimentum velit.{" "}
        </p>

        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt
          mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.
          Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a
          tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam
          ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus.{" "}
        </p>

        <p>
          Integer euismod lacus luctus magna. Quisque cursus, metus vitae
          pharetra auctor, sem massa mattis sem, at interdum magna augue eget
          diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit
          dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi
          in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra
          nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada
          tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in
          dui quis est pulvinar ullamcorper.{" "}
        </p>

        <p>
          Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed
          aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis,
          venenatis tristique, dignissim in, ultrices sit amet, augue. Proin
          sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi
          lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus,
          accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium
          blandit orci. Ut eu diam at pede suscipit sodales.{" "}
        </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Story);
