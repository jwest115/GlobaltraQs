import React, { useState, useEffect, Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {deleteUser, editUser, getUser} from "../../actions/users";
import { Link, Redirect } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {logout} from "../../actions/auth";
import Switch from "react-switch";
import axios from "axios";


export default function Settings(props) {
    const [accountDeleted, setAccountDeleted] = useState(false);
    const [userImage, setUserImage] = useState("");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const userProfile = useSelector(state => state.auth.userProfile);
    const [bio, setBio] = useState("");
    const { id } = props.match.params;
    const [checked, setChecked] = useState(false);
    const [profileVisibilityChecked, setProfileVisibilityChecked] = useState(false);

    const updateAccessibility = () => {
        setChecked(!checked);
        const accessibility_mode_active = !checked;
        console.log("accessibility....");
        console.log(userProfile.accessibility_mode_active);
        const userData = { accessibility_mode_active };
        dispatch(editUser(id, user.id, userData));
    };

    const updateProfileVisibility = () => {
        setProfileVisibilityChecked(!profileVisibilityChecked);
        const is_profile_private = !profileVisibilityChecked;
        console.log("profile visibility....");
        console.log(userProfile.is_profile_private);
        const userData = { is_profile_private };
        dispatch(editUser(id, user.id, userData));
    };

    const deleteAccount = () => {
        dispatch(logout());
        dispatch(deleteUser(id));
        setAccountDeleted(true);
    };

    const uploadImage = e => {
        e.preventDefault();
        const userId = id;
        let data = new FormData();
        data.append("image_url", userImage);
        axios
            .patch(`api/auth/users/${userId}/`, data)
            .then(function(response) {
            console.log(response);
            })
            .catch(function(error) {
            console.log(error);
            });
    };

    const onSubmit = e => {
        e.preventDefault(); //prevents refresh of page
        const userData = { bio };
        dispatch(editUser(id, user.id, userData));
    };

    useEffect(() => {
        dispatch(getUser(id));
    }, id);

     useEffect(() => {
        dispatch(getUser(id));
        console.log("user profile");
        console.log(userProfile);
        if(userProfile) {
            setBio(userProfile.bio);
            console.log(userProfile);
            setChecked(userProfile.accessibility_mode_active);
            setProfileVisibilityChecked(user.is_profile_private);
        }
      }, userProfile);

    console.log("params are " + props.match.params.id);

    console.log("checked " + checked);
    if (accountDeleted) {
      return <Redirect to="/" />;
    }
    const { isAuthenticated, user } = auth;

    let userCanEdit = "";

    if(user) {
        if (id == user.id || user.is_administrator || user.is_moderator) {
          userCanEdit = (
            <div style={{ padding: "20px" }}>
              <div>
                <br />

                <span>Accessibility</span>
                <Switch
                  className="react-switch"
                  onChange={updateAccessibility}
                  checked={checked}
                />
              </div>
                <div>
                <br />

                <span>Profile Visibility</span>
                <Switch
                  className="react-switch"
                  onChange={updateProfileVisibility}
                  checked={profileVisibilityChecked}
                />
              </div>

              <br />

              <button
                onClick={() => deleteAccount()}
                type="button"
                className="btn btn-warning"
              >
                Delete Account
              </button>
              {/*<Redirect to="/" />*/}

              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <br />
                  <label>Bio</label>
                  <input
                    className="form-control"
                    type="text"
                    name="bio"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
              <form onSubmit={uploadImage}>
                  <input
                    type="file"
                    id="image"
                    name="userimage"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setUserImage(e.target.files[0])}
                    required
                  />
              <button>PUSH</button>
            </form>
            </div>
          );
        }
        else {
            userCanEdit = (
                <div>
                    <h2>
                        Forbidden!
                    </h2>
                </div>
            );
        }
    }
    else {
            userCanEdit = (
                <div>
                    <h2>
                        Forbidden!
                    </h2>
                </div>
            );
    }
     return (
        <div style={{ padding: "20px" }}>
            {userCanEdit}
        </div>
     );
}