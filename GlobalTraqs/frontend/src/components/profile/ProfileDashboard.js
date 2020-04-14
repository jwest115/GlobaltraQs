import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Switch, Route, Link, useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { getUserProfile, getUser } from "../../actions/users";

export default function ProfileDashboard() {
  const auth = useSelector((state) => state.auth);
  const [pape, setpape] = useState("initial");
  const { isAuthenticated, user } = auth;
  return (
    <div className="main-content-div">
      <Switch>
        <Route path="/setting"></Route>
        <Route path="/test/:lit">
          <GetUserProfile />
        </Route>
        <Route path="/test"></Route>

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
  const userProfile = useSelector((state) => state.auth.userProfile);
  const woosh = false;
  let { name } = useParams();
  console.log(name);
  useEffect(() => {
    dispatch(getUserProfile(name));
  }, [name]);
  return (
    <>
      <ProfilePage userProfile={userProfile} />
    </>
  );
};
