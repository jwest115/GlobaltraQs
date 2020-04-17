import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavoritePosts, getUser } from "../../actions/users";
import { editPin, getPinsByOwner } from "../../actions/pins";
import { userEditValidate } from "../../actions/auth";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Avatar } from "antd";
import { Markup } from "interweave";
import Switch from "react-switch";
import { Row, Col } from "react-bootstrap";
import useProfileImage from "./CustomHooks/useProfileImage";

const FavoritePostField = ({
  index,
  title,
  isAnon,
  username,
  description,
  id,
  ...rest
}) => {
  return (
    <div style={{ padding: "20px" }} key={id} {...rest}>
      <h3 className="card-title">
        {title} <br />
      </h3>
      <h4>By: {!isAnon ? username : "Anonymous"} </h4>
      <Markup content={description} />
      <Link to={`/story/${id}`}>
        <button type="button" className="btn btn-primary btn-sm">
          View Story
        </button>
      </Link>
    </div>
  );
};

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { profileStatus, isAuthenticated, user } = auth;

  const updateStoryAnonymity = (pin) => {
    const is_anonymous_pin = !pin.is_anonymous_pin;

    const pinData = { is_anonymous_pin };

    dispatch(userEditValidate(pinData, pin.id));
  };

  return (
    <>
      {props.userProfile ? (
        <div style={{ padding: "50px" }}>
          <Row>
            <Col md={8}>
              <UserProfileBio userProfile={props.userProfile} />

              {isAuthenticated && user.id === props.userProfile.id && (
                <Link to={`/users/${user.id}/settings`}>
                  <button type="button" className="btn btn-primary btn-sm">
                    Settings
                  </button>
                </Link>
              )}
              <div className="card">
                <div className="card-body">
                  {props.userProfile.userStories && (
                    <ListUserStories
                      updateStoryAnonymity={updateStoryAnonymity}
                      stories={props.userProfile.userStories}
                      ownerid={props.userProfile.id}
                    />
                  )}
                </div>
              </div>
            </Col>
            <ShowfavoritedPosts
              favoriteStories={props.userProfile.user_upvoted_stories}
            />
          </Row>
        </div>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
}

const ShowfavoritedPosts = (props) => {
  return (
    <Col md={4}>
      <h2>Favorite Posts</h2>
      {props.favoriteStories.length !== 0 ? (
        props.favoriteStories.map((story, index) => {
          return (
            <div key={index}>
              <FavoritePostField
                index={index}
                title={story.title}
                isAnon={story.is_anonymous_pin}
                username={story.pinAuthor ? story.pinAuthor : "Anonymous"}
                description={story.description}
                id={story.pinId}
              />
            </div>
          );
        })
      ) : (
        <NoStories type="Favorite Stories" />
      )}
    </Col>
  );
};

const UserProfileBio = (props) => {
  return (
    <div>
      <Typography variant="h5" component="h3" align="center">
        {props.userProfile.profileurl ? (
          <img
            src={props.userProfile.profileurl}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Avatar size={64} icon="user" />
        )}
        {props.userProfile ? `${props.userProfile.username}` : ""}
        <p>{props.userProfile.bio}</p>
      </Typography>
    </div>
  );
};

const ProfileNotFound = () => {
  return (
    <Typography variant="h5" component="h3" align="center">
      <Avatar size={64} icon="user" />
      <p>Profile Not Found</p>
    </Typography>
  );
};

const NoStories = ({ type }) => {
  return <div style={{ padding: "20px" }}>No {type} found</div>;
};

const ListUserStories = (props) => {
  return (
    <>
      {props.stories.length !== 0 ? (
        props.stories.map((story) => {
          return (
            <div style={{ padding: "20px" }} key={story.id}>
              <StoryField story={story} {...props} />
            </div>
          );
        })
      ) : (
        <NoStories type="User Stories" />
      )}
    </>
  );
};

const StoryField = (props) => {
  const { id, title, description, is_anonymous_pin } = props.story;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <>
      <h5 className="card-title">
        {title} <br />
      </h5>
      <Markup content={description} />
      <Link to={`/story/${id}`}>
        <button type="button" className="btn btn-primary btn-sm">
          View Story
        </button>
      </Link>
      {isAuthenticated &&
        (user.is_administrator || user.id === props.ownerid) && (
          <Switch
            className="react-switch"
            onChange={() => props.updateStoryAnonymity(props.story)}
            checked={is_anonymous_pin}
          />
        )}
    </>
  );
};
