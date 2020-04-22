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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

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
                <h4>By: {!isAnon ? username : "Anonymous"} </h4>
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
          <Row
            style={{ height: "100%", marginRight: "0px", marginLeft: "0px" }}
          >
            <Col md={8} style={{ paddingTop: "20px", paddingRight: "20px" }}>
              {isAuthenticated && user.id === props.userProfile.id && (
                <Link to={`/users/${user.id}/settings`}>
                  <button
                    type="button"
                    style={{ float: "right " }}
                    className="btn btn-primary btn-sm default-btn-purple"
                  >
                    Settings
                  </button>
                </Link>
              )}
              <UserProfileBio userProfile={props.userProfile} />
              <div className={"user-profile-body"}>
                {props.userProfile.userStories && (
                  <ListUserStories
                    updateStoryAnonymity={updateStoryAnonymity}
                    stories={props.userProfile.userStories}
                    ownerid={props.userProfile.id}
                    {...props}
                  />
                )}
              </div>
            </Col>
            <ShowfavoritedPosts
              favoriteStories={props.userProfile.user_upvoted_stories}
            />
          </Row>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
}

const ShowfavoritedPosts = (props) => {
  return (
    <Col md={4} className="favorite-stories">
      <h2 style={{ color: "white" }}>Favorite Posts</h2>
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
    <div className={"user-profile-main-content"}>
      <Row>
        <Col md={2} className={"offset-md-1"}>
        {props.userProfile.profileurl ? (
          <img
            src={props.userProfile.profileurl}
            style={{ borderRadius: "50%", height: "125px", width: "125px", margin: "auto", display: "block"}}
          />
        ) : (
          <Avatar size={100} icon="user" />
        )}
        </Col>
        <Col md={7}>
      <Typography
        variant="h5"
        component="h3"
        align="center"
        style={{ marginTop: "20px" }}
      >
        <h1 className="user-profile-name text-left">
          {props.userProfile ? `${props.userProfile.username}` : ""}
        </h1>
        <p className="user-profile-bio text-left">{props.userProfile.bio}</p>
      </Typography>
        </Col>
      </Row>
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
      <Row>
        <Col md={10} className={"offset-md-2"}>
          <p className={"user-profile-my-posts-title"}>my posts</p>
        </Col>
      </Row>
      {props.stories.length !== 0 ? (
        props.stories.map((story) => {
          return (
            <div style={{ paddingBottom: "20px" }} key={story.id}>
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
    category
  } = props.story;
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  return (
    <>
    <Row style={{ height: "150px"}}>
      <Col md={6} className={"offset-md-2"} style={{ paddingRight: "5px" }}>
      <Card className={"profile-story-card"}>
        <Link to={`/story/${id}`}>
          <div className={category == 1 ? "search-bar-story-card-trim-personal" : (category == 2 ? "search-bar-story-card-trim-community" : "search-bar-story-card-trim-historical")}>
          </div>
            <CardContent style={{ paddingLeft: "40px", paddingRight: "40px", height: "165px" }}>
              <Typography gutterBottom variant="h5" component="h2" className={"sidebar-story-title"}>
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <Markup content={description.substring(0, 250) + "..."} blockList={["img"]} noHtml={true}/>
              </Typography>
              {isAuthenticated &&
                (user.is_administrator || user.id === props.ownerid) && (
                  <button
                    onClick={() =>
                      props.setEditPinState(startDate, endDate, props.story)
                    }
                    type="button"
                    className="btn btn-primary profile-page-edit-story"
                  >
                    edit story
                  </button>
               )}
            </CardContent>
        </Link>
      </Card>
      </Col>
       {isAuthenticated &&
                (user.is_administrator || user.id === props.ownerid) && (
      <Col md={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
        <div className="profile-page-story-settings-card">
          <p className="profile-anonymous-toggle-title">make this post anonymous?</p>
              <Switch
                className="react-switch"
                onColor={"#00ce7d"}
                offColor={"#e63f52"}
                width={90}
                height={35}
                onChange={() => props.updateStoryAnonymity(props.story)}
                checked={is_anonymous_pin}
              />
        </div>
      </Col>
       )}
      </Row>
    </>
  );
};
