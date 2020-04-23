import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, editUser, getUser } from "../../actions/users";
import { Redirect } from "react-router-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { logout } from "../../actions/auth";
import Switch from "react-switch";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import useProfileImage from "./CustomHooks/useProfileImage";
import ProfileImageModal from "./ProfileImageModal";

export default function Settings(props) {
  const [accountDeleted, setAccountDeleted] = useState(false);
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [bio, setBio] = useState("");
  const { id } = props.match.params;
  const [checked, setChecked] = useState(false);
  const [profileVisibilityChecked, setProfileVisibilityChecked] = useState(
    false
  );
  const {
    modalState,
    onSelectFile,
    toggle,
    image,
    crop,
    zoom,
    setcrop,
    setZoom,
    onCropComplete,
    onSubmitPic,
    showCroppedImage,
  } = useProfileImage();
  const updateAccessibility = () => {
    setChecked(!checked);
    const accessibility_mode_active = !checked;

    const userData = { accessibility_mode_active };
    dispatch(editUser(id, user.id, userData));
  };

  const updateProfileVisibility = () => {
    setProfileVisibilityChecked(!profileVisibilityChecked);
    const is_profile_private = !profileVisibilityChecked;

    const userData = { is_profile_private };
    dispatch(editUser(id, user.id, userData));
  };

  const deleteAccount = () => {
    dispatch(logout());
    dispatch(deleteUser(id));
    setAccountDeleted(true);
  };

  const onSubmit = (e) => {
    e.preventDefault(); //prevents refresh of page
    const userData = { bio };
    dispatch(editUser(id, user.id, userData));
  };

  useEffect(() => {
    dispatch(getUser(id));

    if (userProfile) {
      setBio(userProfile.bio);

      setChecked(userProfile.accessibility_mode_active);
      setProfileVisibilityChecked(user.is_profile_private);
    }
  }, []);

  if (accountDeleted) {
    return <Redirect to="/" />;
  }
  const { isAuthenticated, user } = auth;

  let userCanEdit = "";

  if (user) {
    if (id == user.id || user.is_administrator || user.is_moderator) {
      userCanEdit = (
        <Row>
          <Col md={4} className={"offset-md-2"} style={{ paddingTop: "50px" }}>
            <h1>profile settings</h1>
            {/*<Redirect to="/" />*/}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <br />
                <label>Bio</label>
                <input
                  className="form-control profile-settings-bio-form"
                  type="text"
                  name="bio"
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                />
              </div>
              {/*<div className="form-group">*/}
              {/*  <button type="submit" className="btn btn-primary">*/}
              {/*    Submit*/}
              {/*  </button>*/}
              {/*</div>*/}
            </form>
            <div>
              <br />

              <Switch
                className="react-switch"
                onColor={"#00ce7d"}
                offColor={"#e63f52"}
                width={90}
                height={35}
                onChange={updateProfileVisibility}
                checked={profileVisibilityChecked}
              />
              <span>turn on accessibility</span>
            </div>
             <div>
              <br />

              <Switch
                className="react-switch"
                onColor={"#00ce7d"}
                offColor={"#e63f52"}
                width={90}
                height={35}
                onChange={updateAccessibility}
                checked={checked}
              />
              <span>make profile private</span>
            </div>
            <br />
            <button
              onClick={() => deleteAccount()}
              type="button"
              className="btn btn-delete-profile"
            >
              delete profile
            </button>
          </Col>
          <Col md={4}></Col>
        </Row>
      );
    } else {
      userCanEdit = (
        <div>
          <h2>Forbidden!</h2>
        </div>
      );
    }
  } else {
    userCanEdit = (
      <div>
        <h2>Forbidden!</h2>
      </div>
    );
  }
  return (
    <div className={"main-content-div profile-settings-div"}>
      <div style={{ padding: "20px" }}>{userCanEdit}</div>;
    </div>
  );
}
