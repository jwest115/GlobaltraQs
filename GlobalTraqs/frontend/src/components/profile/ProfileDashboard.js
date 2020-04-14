import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Switch, Route, Link, useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { getUserProfile, getUser } from "../../actions/users";
import CircularIndeterminate from "./CircularIndeterminate";
import ProfileSetting from "./ProfileSettings";
export default function ProfileDashboard() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="main-content-div">
      <Switch>
        <Route path="/setting">
          <ProfileSetting />
        </Route>
        <Route path="/test/:lit">
          <GetUserProfile />
        </Route>

        <Route path="/profile/:name">
          <GetUserProfile />{" "}
        </Route>
        <Route path="/profile/"></Route>
      </Switch>
    </div>
  );
}
/*
TODO:
redux user profile 
settings in settings page
loggedin user and viewother user  */
const GetUserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { userProfile, isProfileLoading, profileStatus } = auth;

  let { name } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(name));
  }, [name]);
  console.log("status of profile: " + profileStatus);
  return (
    <>
      {isProfileLoading ? (
        <CircularIndeterminate />
      ) : (
        <ProfilePage userProfile={userProfile} />
      )}
    </>
  );
};
