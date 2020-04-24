import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentStory from "./CommentStory";
import { getPin } from "../../../actions/pins";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Upvote from "./Upvote";
import Flag from "./Flag";
import Moment from "react-moment";
import Markup from "interweave";
import FlagReportModal from "./FlagReportModal";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px",
};
function Story(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { isAuthenticated, user, userFavoritePinState } = auth;

  const upvoteButoon = (
    <Link className="login-link" to="/login">
      {" "}
      &nbsp;Login to favorite!
    </Link>
  );

  if (props.pinDeleted) {
    props.setPinDeleted(false);
    return <Redirect to="/" />;
  }

  let canManagePin = false;

  if (props.isAuthenticated) {
    if (props.user.id == props.pin.owner || props.userRoleVerified) {
      canManagePin = true;
    }
  }

  return (
    <div className="container-fluid" style={storyBody}>
      <div style={{ left: "10", position: "absolute", top: "10" }}>
        <Link
          onClick={() => props.history.goBack()}
          // onClick={() => props.setIsLeavingStoryPage(true)}
        >
          <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
        </Link>
      </div>
      {canManagePin ? (
        <div>
          <div className="admin-moderator-edit">
            <button
              type="button"
              style={{ float: "right" }}
              className="btn btn-primary btn-sm default-btn-purple"
              onClick={(e) =>
                props.setDeleteConfirmation(!props.deleteConfirmation)
              }
            >
              Delete
            </button>
            <button
              type="button"
              style={{ float: "right", marginRight: "20px" }}
              className="btn btn-primary btn-sm default-btn-purple"
              onClick={() => {
                props.setEditPinState(props.pin);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : null}{" "}
      <h2 className={"story-page-story-title"}>
        <strong>{props.pin.title}</strong>
      </h2>
      {props.pin.startDate && props.pin.endDate ? (
        <p className={"story-page-dates"}>
          {" "}
          {props.pin.startDate ? (
            <Moment format="MM/DD/YYYY">{props.pin.startDate}</Moment>
          ) : (
            "No Start Date"
          )}{" "}
          -{" "}
          {props.pin.endDate ? (
            <Moment format="MM/DD/YYYY">{props.pin.endDate}</Moment>
          ) : (
            "No End Date"
          )}{" "}
        </p>
      ) : (
        ""
      )}
      {/* <p>By: {authorName}</p> */}
      {props.pin.is_anonymous_pin ? (
        <p className="sidebar-story-author">
          Posted by: <span className="sidebar-story-username">Anonymous</span>
        </p>
      ) : (
        <Link
          style={{ textDecoration: "inherit" }}
          to={`/users/${props.pin.username}`}
        >
          <p className="sidebar-story-author">
            Posted by:{" "}
            <span className="sidebar-story-username">{props.pin.username}</span>
          </p>
        </Link>
      )}
      <h6 className="story-page-favorites">
        {/* {props.pin.updooots} upvotes */}
        <span className="story-page-favorite-count">
          {props.pin.updooots}
        </span>{" "}
        favorites
        {/* need to figure out a way to update upvotes maybe websockets  */}
        {isAuthenticated
          ? props.pin && props.pin.updotes && <Upvote id={props.pin.id} />
          : upvoteButoon}
        &nbsp;&nbsp;&nbsp;
        {props.isAuthenticated
          ? props.pin && props.pin.flaggerstory && <Flag {...props} />
          : ""}
      </h6>
      <hr></hr>
      <div className="sidebar-story-description">
        <Markup content={props.pin.description} />
      </div>
      {props.pin.commentstory && (
        <CommentStory
          user={user}
          comment={props.pin.commentstory}
          toggleComment={props.toggleComment}
          settoggleComment={props.settoggleComment}
          isAuthenticated={props.isAuthenticated}
          onSubmitComment={props.onSubmitComment}
          userComment={props.userComment}
          setuserComment={props.setuserComment}
          onDeleteComment={props.onDeleteComment}
          toggle={props.flagCommentToggle}
        />
      )}
      {props.isAuthenticated && (
        <FlagReportModal
          flagForm={props.flagForm}
          toggle={props.flagToggle}
          modalState={props.flagModalState}
          onSubmit={props.onFlagSubmit}
          handleChange={props.handleFlagFormChange}
        />
      )}
      {props.isAuthenticated && (
        <FlagReportModal
          flagForm={props.flagForm}
          toggle={props.flagCommentToggle}
          modalState={props.flagCommentModalState}
          onSubmit={props.onFlagCommentSubmit}
          handleChange={props.handleFlagFormChange}
        />
      )}
    </div>
  );
}

export default Story;
