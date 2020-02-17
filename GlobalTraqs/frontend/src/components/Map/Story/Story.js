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
  useRouteMatch
} from "react-router-dom";
import Upvote from "./Upvote";
import Flag from "./Flag";
import Moment from "react-moment";
import Markup from "interweave";

const storyBody = {
  paddingTop: "50px",
  paddingLeft: "50px",
  paddingRight: "50px"
};
function Story(props) {
    console.log("edit pin is ");
    console.log(props.editPin);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(props.pin);
  const { isAuthenticated, user } = auth;

  const [flagState, setflagState] = useState(false);

  const upvoteButoon = <Link to="/login"> &nbsp;Login to upvote!</Link>;


  if (props.pinDeleted) {
      props.setPinDeleted(false);
      return <Redirect to="/test" />;
  }

  let canManagePin = false;

  if (props.isAuthenticated) {
      if (props.user.id == props.pin.owner || props.userRoleVerified) {
        canManagePin = true;
      }
  }

  //console.log(pin.flaggerstory);
  return (
    <div className="container-fluid" style={storyBody}>
         {canManagePin ? (
           <div>
               <div className="admin-moderator-edit">
                   <button
                       type="button"
                       className="btn btn-primary btn-sm"
                       onClick={e => {
                            props.seteditPin({
                                    id: props.pin.id,
                                    title: props.pin.title,
                                    description: props.pin.description,
                                    category: props.pin.category
                                });
                           props.seteditpinmodalState(!props.editpinmodalState)
                       }}
                   >
                       Edit
                   </button>
               </div>
               <button
                   type="button"
                   className="btn btn-primary btn-sm"
                   onClick={e =>
                       props.setDeleteConfirmation(!props.deleteConfirmation)
                   }
               >
                   Delete
               </button>
           </div>
       ) : null}
      {" "}
      <h2>
        <strong>{props.pin.title}</strong>
      </h2>
      <p>
        {" "}
        {props.pin.startDate ? <Moment format="MM/DD/YYYY">{props.pin.startDate}</Moment> : "No Start Date"} -{" "}
        {props.pin.endDate ? <Moment format="MM/DD/YYYY">{props.pin.endDate}</Moment> : "No End Date"}{" "}
      </p>
      {/* <p>By: {authorName}</p> */}
      {props.pin.is_anonymous_pin ? (
        <p>By: Anonymous</p>
      ) : (
        <p>By: {props.pin.username}</p>
      )}
      <h6>
        {/* {props.pin.updooots} upvotes */}
        {props.pin.updooots} upvotes
        {/* need to figure out a way to update upvotes maybe websockets  */}
        {props.isAuthenticated
          ? props.pin && props.pin.updotes && <Upvote {...props} />
          : upvoteButoon}
        &nbsp;&nbsp;&nbsp;
        {props.isAuthenticated
          ? props.pin && props.pin.flaggerstory && <Flag {...props} />
          : ""}
      </h6>
      <hr></hr>
      <Markup content={props.pin.description} />
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
        />
      )}
    </div>
  );
}

export default Story;
