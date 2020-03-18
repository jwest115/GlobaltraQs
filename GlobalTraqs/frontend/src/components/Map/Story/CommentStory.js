import React from "react";
import { deleteComment } from "../../../actions/pins";
import { delFlagComment } from "../../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

function CommentStory(props) {
  const dispatch = useDispatch();

  return (
    <>
      {props.isAuthenticated ? (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => props.settoggleComment(!props.toggleComment)}
        >
          Add Comment
        </button>
      ) : (
        ""
      )}
      {props.toggleComment ? <AddCommentForm {...props} /> : ""}
      {props.comment.map((userComment, index) => {
        return (
          <div
            className="card border-primary mb-3 col-md-6"
            key={userComment.id}
          >
            <div className="card-header">
              {userComment.is_anonymous_comment
                ? "Anonymous"
                : userComment.username}
            </div>
            <div className="card-body">
              {/*<h4 className="card-title">{userComment.description}</h4>*/}
              <p className="card-text">
                {userComment.description}
                {/*Some quick example text to build on the card title and make up*/}
                {/*the bulk of the card's content.*/}
              </p>
              {props.isAuthenticated &&
              (props.user.id === userComment.commenter ||
                props.user.is_moderator ||
                props.user.is_administrator) ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={e => {
                    dispatch(deleteComment(userComment.id));
                  }}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
              {props.isAuthenticated ? (
                <FlagButton id={userComment.id} {...props} />
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentStory;

const FlagButton = props => {
  console.log(props.id);
  const dispatch = useDispatch();
  const flagCommentCheck = props.user.flaggerComment.some(
    userFlagComment => userFlagComment.comment === props.id
  );
  const flagid = flagCommentCheck
    ? props.user.flaggerComment.filter(a => a.comment === props.id)
    : "";

  return (
    <>
      {flagCommentCheck ? (
        <button
          onClick={() => dispatch(delFlagComment(flagid[0].id))}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Remove Flag
        </button>
      ) : (
        <button
          onClick={() => props.toggle(props.id)}
          type="button"
          className="btn btn-primary btn-sm"
        >
          Flag
        </button>
      )}
    </>
  );
};

const AddCommentForm = props => {
  if (props.user) {
    return (
      <div className="card border-primary mb-3 col-md-6">
        <div className="card-header">
          {props.user.is_anonymous_active ? "Anonymous " : props.user.username}
        </div>
        <div className="card-body">
          <h4 className="card-title">Post a Comment</h4>
          <form onSubmit={props.onSubmitComment}>
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleTextarea"
                rows="3"
                onChange={e =>
                  props.setuserComment({
                    ...props.userComment,
                    is_anonymous_comment: props.user.is_anonymous_active,
                    description: e.target.value
                  })
                }
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Post
            </button>
          </form>

          {/*<p className="card-text">*/}
          {/*  Some quick example text to build on the card title and make up the*/}
          {/*  bulk of the card's content.*/}
          {/*</p>*/}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
