import React, { useState, useEffect, Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions/users";
import { getPinsByOwner } from "../../actions/pins";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Avatar } from "antd";
import { Markup } from "interweave"

export default function ProfilePage(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const stories = useSelector(state => state.pins.pins);
    const userProfile = useSelector(state => state.auth.userProfile);
    const { id } = props.match.params;

    useEffect(() => {
        dispatch(getUser(id));
        dispatch(getPinsByOwner(id));
    }, id);

    const { isAuthenticated, user } = auth;


    const authLinks = (
      <Link to={`/users/${id}/settings`} params={{ testvalue: "hello" }}>
        <button type="button" className="btn btn-primary btn-sm">
          Settings
        </button>
      </Link>
    );

    let canEdit = false;
    if(isAuthenticated) {
        if (user != null && user.id == id || user.is_administrator || user.is_moderator) {
            canEdit = true;
        }
    }

    return (
        <div>
            {userProfile ? (
                <div>
                    <div>
                        <Typography variant="h5" component="h3" align="center">
                            {userProfile.image_url ? (
                                <img src={userProfile.image_url}/>
                            ) : (
                                <Avatar size={64} icon="user"/>
                            )}
                            {userProfile
                                ? ` ${userProfile.username}'s Profile Page`
                                : ""}
                            <p>
                                <strong>Bio: </strong>
                                {userProfile.bio}
                            </p>
                        </Typography>
                        {canEdit ? authLinks : ""}
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {stories.map((story, index) => {
                                if(!userProfile.is_profile_private || isAuthenticated && user.id == id) {
                                    if (!story.is_anonymous_pin || isAuthenticated && user.id == id) {
                                        return (
                                            <div style={{padding: "20px"}} key={index}>
                                                <h5 className="card-title">
                                                    {story.title} <br/>
                                                </h5>
                                                <Markup content={story.description}/>
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
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}