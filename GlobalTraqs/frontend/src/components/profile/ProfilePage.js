import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFavoritePosts,
  getUser,
  unFavoriteProfile,
} from "../../actions/users";
import { editPin, getPinsByOwner, userUpovte } from "../../actions/pins";
import { userEditValidate } from "../../actions/auth";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Avatar } from "antd";
import { Markup } from "interweave";
import Switch from "react-switch";
import { Row, Col } from "react-bootstrap";
import useProfileImage from "./CustomHooks/useProfileImage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Upvote from "../Map/Story/Upvote";
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
    <div style={{ paddingTop: "20px" }} key={id} {...rest}>
      <Card style={{ marginTop: "5px", color: "rgb(77, 65, 133)" }}>
        <Link to={`/story/${id}`}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                <h4>By: {!isAnon && username ? username : "Anonymous"} </h4>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <Markup content={description} />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
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
        <div style={{ height: "100%" }}>
          <Row
            style={{ height: "100%", marginRight: "0px", marginLeft: "0px" }}
          >
            <Col md={8} style={{ padding: "20px" }}>
              {isAuthenticated && user.id === props.userProfile.id && (
                <Link to={`/users/${user.id}/settings`}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm default-btn-purple"
                  >
                    Settings
                  </button>
                </Link>
              )}
              <UserProfileBio
                ownerid={props.userProfile.id}
                userProfile={props.userProfile}
                {...props}
              />
              <div className="card">
                <div className="card-body">
                  {props.userProfile.userStories && (
                    <ListUserStories
                      updateStoryAnonymity={updateStoryAnonymity}
                      stories={props.userProfile.userStories}
                      ownerid={props.userProfile.id}
                      {...props}
                    />
                  )}
                </div>
              </div>
            </Col>
            <ShowfavoritedPosts
              ownerid={props.userProfile.id}
              toggle={props.removalToggle}
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
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const dispatch = useDispatch();
  return (
    <Col md={4} className="favorite-stories">
      <h2 style={{ color: "white" }}>Favorite Posts</h2>
      {props.favoriteStories.length !== 0 ? (
        props.favoriteStories.map((story, index) => {
          return (
            <div key={story.id}>
              <FavoritePostField
                index={index}
                title={story.title}
                isAnon={story.is_anonymous_pin}
                username={story.pinAuthor}
                description={story.description}
                id={story.pinId}
              />
              {isAuthenticated &&
                (user.is_administrator || user.id === props.ownerid) && (
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={() => props.toggle(story.id)}
                  >
                    Unfavorite
                  </button>
                )}
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
  const auth = useSelector((state) => state.auth);

  const { profileStatus, isAuthenticated, user } = auth;
  return (
    <div>
      <Typography variant="h5" component="h3" align="center">
        {props.userProfile.profileurl ? (
          <img
            src={props.userProfile.profileurl}
            style={{ borderRadius: "50%" }}
          />
        ) : (
          <Avatar size={250} icon="user" />
        )}
      </Typography>
      {isAuthenticated && user.id === props.ownerid && (
        <button onClick={() => props.toggle()}>Change</button>
      )}
      <Typography
        variant="h5"
        component="h3"
        align="center"
        style={{ marginTop: "20px" }}
      >
        <h1 className="user-profile-name">
          {props.userProfile ? `${props.userProfile.username}` : ""}
        </h1>
        <p>{props.userProfile.bio}</p>
      </Typography>
    </div>
  );
};

const ProfileNotFound = () => {
  return (
    <Typography variant="h5" component="h3" align="center">
      <Avatar size={250} icon="user" />
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
  const {
    id,
    title,
    description,
    is_anonymous_pin,
    startDate,
    endDate,
  } = props.story;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <>
      <Card style={{ marginTop: "5px" }}>
        <Link to={`/story/${id}`}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <Markup content={description} />
              </Typography>
              {isAuthenticated &&
                (user.is_administrator || user.id === props.ownerid) && (
                  <Switch
                    className="react-switch"
                    onChange={() => props.updateStoryAnonymity(props.story)}
                    checked={is_anonymous_pin}
                  />
                )}
            </CardContent>
          </CardActionArea>
        </Link>
        {isAuthenticated &&
          (user.is_administrator || user.id === props.ownerid) && (
            <button
              className="default-btn-purple btn btn-primary btn-sm"
              onClick={() =>
                props.setEditPinState(startDate, endDate, props.story)
              }
              type="button"
              className="btn btn-primary btn-sm"
            >
              Edit
            </button>
          )}
      </Card>
    </>
  );
};
