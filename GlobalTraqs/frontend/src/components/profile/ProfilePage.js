import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavoritePosts, getUser} from "../../actions/users";
import { editPin, getPinsByOwner } from "../../actions/pins";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Avatar } from "antd";
import { Markup } from "interweave";
import Switch from "react-switch";
import { Row, Col } from 'react-bootstrap';

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const stories = useSelector(state => state.pins.pins);
  const userProfile = useSelector(state => state.auth.userProfile);
  const { id } = props.match.params;

  const favoriteStories = useSelector(state => state.auth.favoriteStories);

  useEffect(() => {
    dispatch(getUser(id));
    dispatch(getPinsByOwner(id));
    dispatch(getFavoritePosts(id));
  }, [id]);

  const { isAuthenticated, user } = auth;

  const updateStoryAnonymity = pin => {
    const is_anonymous_pin = !pin.is_anonymous_pin;

    const pinData = { is_anonymous_pin };

    dispatch(editPin(pinData, pin.id, id));
  };

  const authLinks = (
    <Link to={`/users/${id}/settings`}>
      <button type="button" className="btn btn-primary btn-sm">
        Settings
      </button>
    </Link>
  );

  const favoritedPosts = (
      <div>
        <h2>Favorite Posts</h2>
          {favoriteStories.map((story, index) => {
            return (
                <div style={{ padding: "20px" }} key={index}>
                  <h3 className="card-title">
                    {story.title} <br />
                  </h3>
                  <h4>By: {story.username ? story.username : "Anonymous"} </h4>
                  <Markup content={story.description} />
                  <Link to={`/story/${story.id}`}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      View Story
                    </button>
                  </Link>
                </div>
            );
          })}
      </div>
  );

  let canEdit = false;
  if (isAuthenticated) {
    if (
      (user != null && user.id == id) ||
      user.is_administrator ||
      user.is_moderator
    ) {
      canEdit = true;
    }
  }

  return (
    <div className={"main-content-div"}>
      {userProfile ? (
        <div style={{padding: "50px"}}>
          <Row>
            <Col md={8}>
            <div>
              <Typography variant="h5" component="h3" align="center">
                {userProfile.image_url ? (
                  <img src={userProfile.image_url} />
                ) : (
                  <Avatar size={64} icon="user" />
                )}
                <h1>{userProfile ? `${userProfile.username}` : ""}</h1>
                <p>
                  {userProfile.bio}
                </p>
              </Typography>
              {canEdit ? authLinks : ""}
            </div>
            <div className="card">
              <div className="card-body">
                {stories.map((story, index) => {
                  if (!userProfile.is_profile_private || (isAuthenticated && user.id == id)) {
                    if (!story.is_anonymous_pin || (isAuthenticated && user.id == id)) {
                      return (
                        <div style={{ padding: "20px" }} key={index}>
                          <h5 className="card-title">
                            {story.title} <br />
                          </h5>
                          <Markup content={story.description} />
                          <Link to={`/story/${story.id}`}>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                            >
                              View Story
                            </button>
                          </Link>
                          {isAuthenticated && user.id == id || canEdit ? (
                          <Switch
                            className="react-switch"
                            onChange={() => updateStoryAnonymity(story)}
                            checked={story.is_anonymous_pin}
                          />
                              ) : ""}
                        </div>
                      );
                    }
                  }
                  else {
                    return(
                        <h4>This user's profile is private.</h4>
                    );
                  }
                })}
              </div>
            </div>
            </Col>
            <Col md={4}>
              {favoritedPosts}
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
