import React from "react";

function CommentStory(props) {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={props.settoggleComment(!props.settoggleComment)}
      >
        {" "}
        Add Comment
      </button>
      <AddCommentForm {...props} />
      {props.comment.map((userComment, index) => {
        return (
          <div className="card border-primary mb-3 col-md-6" key={index}>
            <div className="card-header">{userComment.username}</div>
            <div className="card-body">
              <h4 className="card-title">{userComment.description}</h4>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentStory;

const AddCommentForm = props => {
  return (
    <div className="card border-primary mb-3 col-md-6">
      <div className="card-header">{props.username}</div>
      <div className="card-body">
        <h4 className="card-title">user Comment </h4>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </div>
  );
};
